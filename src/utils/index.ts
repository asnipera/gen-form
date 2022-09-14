import { Selection, Range, TextEditor } from 'vscode';
import * as vscode from 'vscode';
import {
  Componet,
  getInlineTagTemplate,
  getTagTemplate,
} from '../antDesignVue';
import {
  wrapCol,
  wrapForm,
  wrapFormItem,
  wrapRow,
} from '../antDesignVue/components/form';

const formFlag = '````';
function genRange(content: string) {
  const lines = content.split(getEnterStr());
  const start = lines.findIndex((line) => line.includes(formFlag));
  if (start === -1) {
    vscode.window.showWarningMessage(`请在表单的开始位置添加:${formFlag}`);
    return [];
  }
  const startCharacter = lines[start].indexOf(formFlag);
  // @ts-ignore
  const end = lines.findLastIndex((line) => line.includes(formFlag));
  if (end === -1) {
    vscode.window.showWarningMessage('请在表单的结束位置添加:${formFlag}');
    return [];
  }
  const endCharacter = lines[end].indexOf(formFlag) + formFlag.length;

  const range = new vscode.Range(start, startCharacter, end, endCharacter);
  return [start, end, range];
}

// 换行
function getEnterStr(): string {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return '';
  }
  const document = editor!.document;
  return document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
}
function genTagNames(context: string) {
  return context.split(getEnterStr());
}
const inlineSplit = '|';
type FormState = Record<string, any>;
function genForm(tags: string[]) {
  const formList: string[] = [];
  const formState: FormState = {};
  let extraStr = '';
  tags.forEach((tag, rowIndex) => {
    const pIndex = (rowIndex + 1).toString();
    const isInlineTag = tag.includes(inlineSplit);
    if (isInlineTag) {
      const tags = getInlineTagTemplate(tag);
      const span = 24 / tags.length;
      const cols: string[] = [];
      tags.forEach((tag, colIndex) => {
        const component = getTagTemplate(tag);
        if (component) {
          const { template, key, value, extra } = component(
            `${pIndex}_${colIndex + 1}`
          );
          const item = wrapFormItem(template, key);
          const col = wrapCol(span, item);
          cols.push(col);
          formState[key] = value;
          if (extra) {
            extraStr += extra;
          }
        }
      });
      const row = wrapRow(cols.join(''));
      formList.push(row);
    } else {
      const value = getTagTemplate(tag);
      if (value) {
        const extra = pushItemToFormAndScript(
          formList,
          formState,
          value,
          pIndex
        );
        if (extra) {
          extraStr += extra;
        }
      }
    }
  });
  const formStr = wrapForm(formList.join(''));
  let scriptStr =
    'const formState = reactive(' + JSON.stringify(formState) + ');';
  scriptStr += getEnterStr();
  scriptStr += 'const rules = {};';
  scriptStr += extraStr;
  scriptStr += getEnterStr();
  scriptStr += endScriptTag;
  return [formStr, scriptStr];
}

function pushItemToFormAndScript(
  formList: string[],
  formState: FormState,
  component: Componet,
  index: string
) {
  const { template, key, value, extra } = component(index);
  formList.push(wrapFormItem(template, key));
  formState[key] = value;
  return extra;
}

function replace(
  selection: Selection | Range,
  formStr: string,
  scriptRange: Range,
  scriptStr: string,
  editor: TextEditor
) {
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, formStr);
    editBuilder.replace(scriptRange, scriptStr);
  });
}

export function replaceEditorByFormFlag(text: string, editor: TextEditor) {
  const [start, end, selection] = genRange(text);
  if (start === undefined || end === undefined) {
    return '';
  }
  const tagNames = genTagNames(text).slice(start + 1, end);
  render(text, selection, tagNames, editor);
}

export function replaceEditorBySelection(
  text: string,
  selection: Selection,
  editor: TextEditor
) {
  const tagNames = genTagNames(text);
  render(text, selection, tagNames, editor);
}

function render(
  text: string,
  selection: Range | Selection,
  tagNames: string[],
  editor: TextEditor
) {
  const [formStr, scriptStr] = genForm(tagNames);
  const scriptRange = genEndScriptRange(text);
  replace(selection, formStr, scriptRange, scriptStr, editor);
  return scriptStr;
}

const closeScriptTagReg = /<\/script>(?!"|')/;
const endScriptTag = '</script>';
export function genEndScriptRange(text: string) {
  const textList = text.split(getEnterStr());
  let start = -1,
    startCharacter = -1;
  textList.forEach((line, i) => {
    const result = line.match(closeScriptTagReg);
    if (result && result.index !== undefined) {
      start = i;
      startCharacter = result.index;
    }
  });
  const range = new vscode.Range(
    start,
    startCharacter,
    start,
    startCharacter + endScriptTag.length
  );

  return range;
}
