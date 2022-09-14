import { Selection, Range, TextEditor, window, EndOfLine } from "vscode";
import { antComponentTemplates } from "../antDesignVue";
import {
  wrapCol,
  wrapForm as wrapFormComponent,
  wrapFormItem,
  wrapRow as wrapRowComponent,
} from "../antDesignVue/components/form";
import { CLOSE_SCRIPT_REG, END_SCRIPT_TAG, FORM_FLAG, FORM_STATE, INLINE_SPLIT, RULES } from "../constant";
import { Componet } from "./template";

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
  const formStr = wrapFormComponent(formList);
  const scriptStr = genScriptStr(formState, extraStr);
  return [formStr, scriptStr];
}

function genScriptStr(formState: FormState, script: string) {
  let scriptStr = [FORM_STATE.replace(/object/, JSON.stringify(formState))];
  scriptStr.push(ENTER);
  scriptStr.push(RULES);
  scriptStr.push(script);
  scriptStr.push(ENTER);
  scriptStr.push(END_SCRIPT_TAG);
  return scriptStr.join("");
}

function pushMutipleColToFormAndScript(tag: string, index: string, formState: FormState, formList: string[]) {
  let extraStr = "";
  const tags = getInlineTags(tag);
  const span = 24 / tags.length;
  const cols: string[] = [];
  tags.forEach((tag, colIndex) => {
    const component = getTagTemplate(tag);
    if (component) {
      const { template, key, value, extra } = component(`${index}_${colIndex + 1}`);
      const item = wrapFormItem(template, key);
      const col = wrapCol(span, item);
      cols.push(col);
      formState[key] = value;
      if (extra) {
        extraStr += extra;
      }
    }
  });
  const row = wrapRowComponent(cols.join(""));
  formList.push(row);
  return extraStr;
}

function pushSingleColToFormAndScript(tag: string, index: string, formState: FormState, formList: string[]) {
  const component = getTagTemplate(tag);
  if (component) {
    const { template, key, value, extra } = component(index);
    formList.push(wrapFormItem(template, key));
    formState[key] = value;
    return extra ?? "";
  }
  return "";
}

function replace(selection: Selection | Range, formStr: string, scriptRange: Range, scriptStr: string, editor: TextEditor) {
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, formStr);
    editBuilder.replace(scriptRange, scriptStr);
  });
}

export function replaceEditorByFormFlag(text: string, editor: TextEditor) {
  const [start, end, selection] = genSectionRange(text);
  if (start === undefined || end === undefined) {
    return "";
  }
  const tagNames = parseTagNames(text).slice(start + 1, end);
  render(text, selection, tagNames, editor);
}

export function replaceEditorBySelection(text: string, selection: Selection, editor: TextEditor) {
  const tagNames = parseTagNames(text);
  render(text, selection, tagNames, editor);
}

function render(text: string, selection: Range | Selection, tagNames: string[], editor: TextEditor) {
  const [formStr, scriptStr] = genForm(tagNames);
  const scriptRange = genEndScriptRange(text);
  if (!scriptRange) {
    warning("未找到section：script ");
  } else {
    replace(selection, formStr, scriptRange, scriptStr, editor);
  }
}

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

export function getTagTemplate(tag: string) {
  let value: Componet | undefined;
  Array.from(antComponentTemplates.keys()).forEach((key) => {
    if (key.includes(tag.trim())) {
      value = antComponentTemplates.get(key)!;
    }
  });
  return value;
}

export function getInlineTags(inlineTag: string) {
  const tags = inlineTag.split("|");
  return tags.map((tag) => tag.trim());
}
