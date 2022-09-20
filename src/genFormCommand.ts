import { window } from "vscode";
import * as fs from "fs";
import { transform } from "./utils/utils";

export function genFormCommand(args: any) {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }
  const document = editor.document;
  const text = document.getText();
  const filePath = args?.fsPath || document.fileName;
  const sfc = transform(text);
  fs.promises.writeFile(filePath, sfc).then(() => {
    window.showInformationMessage(`成功生成表单！`);
  });
}
