import * as vscode from "vscode";
import { replaceEditorByFormFlag, replaceEditorBySelection } from "./utils";

export function genFormCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const text = document.getText();

  if (selection.isEmpty) {
    replaceEditorByFormFlag(text, editor);
  } else {
    replaceEditorBySelection(text, selection, editor);
  }
}
