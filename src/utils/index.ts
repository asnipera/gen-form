import { Selection } from 'vscode';
import * as vscode from 'vscode';
import { getTagTemplate } from '../antDesignVue';
import { wrapForm, wrapFormItem } from '../antDesignVue/components/form';

const formFlag = '````';

function genRange(content: string) {
  const lines = content.split('\r\n');
  const start = lines.findIndex((line) => line.includes(formFlag));
  if (start === -1) {
    vscode.window.showWarningMessage('请在表单的开始位置添加:```');
    return [];
  }
  const startCharacter = lines[start].indexOf(formFlag);
  // @ts-ignore
  const end = lines.findLastIndex((line) => line.includes(formFlag));
  if (end === -1) {
    vscode.window.showWarningMessage('请在表单的结束位置添加:```');
    return [];
  }
  const endCharacter = lines[end].indexOf(formFlag) + formFlag.length;

  const range = new vscode.Range(start, startCharacter, end, endCharacter);
  return [start, end, range];
}

function genTagNames(context: string) {
  return context.trim().split('\r\n');
}

function genForm(componentTag: string[]) {
  const formStr: string[] = [];
  componentTag.forEach((tag) => {
    const template = getTagTemplate(tag.trim());
    if (template) {
      formStr.push(wrapFormItem(template));
    }
  });

  return wrapForm(formStr.join(''));
}

function replace(
  selection: Selection,
  formStr: string,
  editor: vscode.TextEditor
) {
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, formStr);
  });
}

export function replaceEditorByFormFlag(
  text: string,
  editor: vscode.TextEditor
) {
  const [start, end, range] = genRange(text);
  if (start === undefined || end === undefined) {
    return;
  }
  const tagNames = genTagNames(text).slice(start + 1, end);
  const formStr = genForm(tagNames);
  replace(range, formStr, editor);
}

export function replaceEditorBySelection(
  text: string,
  selection: Selection,
  editor: vscode.TextEditor
) {
  const tagNames = genTagNames(text);
  const formStr = genForm(tagNames);
  replace(selection, formStr, editor);
}
