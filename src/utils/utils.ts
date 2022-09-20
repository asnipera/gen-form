import { Selection, Range, TextEditor, window, EndOfLine, workspace } from "vscode";
export function getEnterStr(): string {
  const editor = window.activeTextEditor;
  if (!editor) {
    return "";
  }
  const document = editor!.document;
  return document.eol === EndOfLine.LF ? "\n" : "\r\n";
}

export function genMutipleLineTmpl(tmpl: string[]) {
  const enter = getEnterStr();
  return tmpl.join(enter);
}
