import { Selection, Range, TextEditor, window, EndOfLine, workspace } from "vscode";
import { antComponentTemplates } from "../antDesignVue";
import {
  wrapCol,
  wrapForm as wrapFormComponent,
  wrapFormItem,
  wrapRow as wrapRowComponent,
} from "../commonUI/form";
import { ANT_DESIGN_VUE, CLOSE_SCRIPT_REG, END_SCRIPT_TAG, FORM_FLAG, FORM_STATE, INLINE_SPLIT, RULES, VIEW_DESIGN, VUE2_DATA_REG, VUE2_DATA_RETURN_REG, VUE2_DATA_RETURN_TAG, VUE2_FORM_STATE, VUE2_RULES } from "../constant";
import { iviewComponentTemplates } from "../viewDesign";
import { Component } from "./register";

export type UIType = typeof ANT_DESIGN_VUE | typeof VIEW_DESIGN

function getEnterStr(): string {
  const editor = window.activeTextEditor;
  if (!editor) {
    return "";
  }
  const document = editor!.document;
  return document.eol === EndOfLine.LF ? "\n" : "\r\n";
}

const ENTER = getEnterStr();

function parseTagNames(context: string) {
  return context.split(ENTER);
}

function warning(info: string) {
  window.showWarningMessage(info);
}

function genSectionRange(content: string) {
  const lines = content.split(ENTER);
  const start = lines.findIndex((line) => line.includes(FORM_FLAG));
  if (start === -1) {
    warning(`请在表单的开始位置添加:${FORM_FLAG}`);
    return [];
  }
  const startCharacter = lines[start].indexOf(FORM_FLAG);
  // @ts-ignore
  const end = lines.findLastIndex((line) => line.includes(FORM_FLAG));
  if (end === -1) {
    warning(`请在表单的结束位置添加:${FORM_FLAG}`);
    return [];
  }
  const endCharacter = lines[end].indexOf(FORM_FLAG) + FORM_FLAG.length;
  const range = new Range(start, startCharacter, end, endCharacter);
  return [start, end, range];
}

type FormState = Record<string, any>;

// 生成form
function genForm(tags: string[]) {
  const formList: string[] = [];
  const formState: FormState = {};
  let extraStr = "";
  tags.forEach((tag, rowIndex) => {
    const index = (rowIndex + 1).toString();
    const isMutipleCol = tag.includes(INLINE_SPLIT);
    extraStr += isMutipleCol
      ? pushMutipleColToFormAndScript(tag, index, formState, formList)
      : pushSingleColToFormAndScript(tag, index, formState, formList);
  });
  const formStr = wrapFormComponent(getConfigurationUI(), formList);
  const ui = getConfigurationUI()
  const scriptStr = ui === VIEW_DESIGN ? genVue2ScriptStr(formState, extraStr) : genScriptStr(formState, extraStr);
  return [formStr, scriptStr];
}

// 生成form相关的script字符串 (vue3版本)
function genScriptStr(formState: FormState, script: string) {
  let scriptStr = [FORM_STATE.replace(/object/, JSON.stringify(formState))];
  scriptStr.push(ENTER);
  scriptStr.push(RULES);
  scriptStr.push(script);
  scriptStr.push(ENTER);
  scriptStr.push(END_SCRIPT_TAG);
  return scriptStr.join("");
}

// 生成form相关的script字符串 (vue2版本)
function genVue2ScriptStr(formState: FormState, script: string) {
  let scriptStr = [VUE2_DATA_RETURN_TAG];
  scriptStr.push(ENTER);
  scriptStr.push(VUE2_FORM_STATE.replace(/object/, JSON.stringify(formState)));
  scriptStr.push(ENTER);
  scriptStr.push(VUE2_RULES);
  scriptStr.push(ENTER);
  scriptStr.push(script);
  return scriptStr.join("");
}

// 收集多列标签对应的template和script
function pushMutipleColToFormAndScript(tag: string, index: string, formState: FormState, formList: string[]) {
  let extraStr = "";
  const tags = getInlineTags(tag);
  const span = 24 / tags.length;
  const cols: string[] = [];
  tags.forEach((tag, colIndex) => {
    const component = getTagTemplate(tag);
    if (component) {
      const { template, key, value, extra } = component(`${index}_${colIndex + 1}`);
      const item = wrapFormItem(getConfigurationUI(), template, key);
      const col = wrapCol(getConfigurationUI(), span, item);
      cols.push(col);
      formState[key] = value;
      if (extra) {
        extraStr += extra;
      }
    }
  });
  const row = wrapRowComponent(getConfigurationUI(), cols.join(""));
  formList.push(row);
  return extraStr;
}

// 收集单列标签对应的template和script
function pushSingleColToFormAndScript(tag: string, index: string, formState: FormState, formList: string[]) {
  const component = getTagTemplate(tag);
  if (component) {
    const { template, key, value, extra } = component(index);
    formList.push(wrapFormItem(getConfigurationUI(), template, key));
    formState[key] = value;
    return extra ?? "";
  }
  return "";
}

// 通过replace替换当前文件的内容
function replace(selection: Selection | Range, formStr: string, scriptRange: Range, scriptStr: string, editor: TextEditor) {
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, formStr);
    editBuilder.replace(scriptRange, scriptStr);
  });
}

// 通过起始标记调用
export function replaceEditorByFormFlag(text: string, editor: TextEditor) {
  const [start, end, selection] = genSectionRange(text);
  if (start === undefined || end === undefined) {
    return "";
  }
  const tagNames = parseTagNames(text).slice(start + 1, end);
  render(text, selection, tagNames, editor);
}

// 鼠标选中时调用
export function replaceEditorBySelection(text: string, selection: Selection, editor: TextEditor) {
  const tagNames = parseTagNames(text);
  render(text, selection, tagNames, editor);
}

// 渲染form相关的template和script
function render(text: string, selection: Range | Selection, tagNames: string[], editor: TextEditor) {
  const [formStr, scriptStr] = genForm(tagNames);
  const ui = getConfigurationUI()
  const scriptRange = ui === VIEW_DESIGN ? genDataReturnRange(text) : genEndScriptRange(text);
  if (!scriptRange) {
    warning(ui === VIEW_DESIGN ? "未找到section：data return" : "未找到section：script");
  } else {
    replace(selection, formStr, scriptRange, scriptStr, editor);
  }
}

// 获取</script>标签的range对象
export function genEndScriptRange(text: string) {
  const textList = text.split(ENTER);
  let start = -1,
    startCharacter = -1;
  textList.forEach((line, i) => {
    const result = line.match(CLOSE_SCRIPT_REG);
    if (result && result.index !== undefined) {
      start = i;
      startCharacter = result.index;
    }
  });

  if (start === -1) {
    return null;
  }
  return new Range(start, startCharacter, start, startCharacter + END_SCRIPT_TAG.length);
}

// 获取vue data return的range对象 (正则匹配规则有待完善)
export function genDataReturnRange(text: string) {
  const textList = text.split(ENTER);
  let start = -1;
  textList.forEach((line, i, lines) => {
    if (start !== -1) return
    const result = line.match(VUE2_DATA_RETURN_REG) && lines[i - 1].match(VUE2_DATA_REG);
    result && (start = i)
  });

  if (start === -1) {
    return null;
  }
  return new Range(start, 0, start, textList[start].length);
}

// 获取配置文件中设置的UI
function getConfigurationUI() {
  const config = workspace.getConfiguration();
  const ui = config.get("platform.UI");
  return ui as UIType
}

// 获取配置的UI对应的模板
function getUITemplate() {
  const ui = getConfigurationUI()
  return ui === VIEW_DESIGN ? iviewComponentTemplates : antComponentTemplates
}

// 根据tag获取key
function getKeyByTag(templates: Map<string[], Component>, tag: string) {
  return Array.from(templates.keys()).find((key) => key.includes(tag.trim()));
}

// 获取标签对应的模板
export function getTagTemplate(tag: string) {
  let value: Component | undefined;
  const templates = getUITemplate();
  const key = getKeyByTag(templates, tag);
  if (key) {
    value = templates.get(key);
  }
  return value;
}

// 获取行内标签
export function getInlineTags(inlineTag: string) {
  const tags = inlineTag.split("|");
  return tags.map((tag) => tag.trim());
}
