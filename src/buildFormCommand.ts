import { Range, window } from "vscode";
import { transform } from "./utils/utils";

export function buildFormCommand() {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }
  debugger;
  const document = editor.document;
  const text = document.getText();
  const sfc = transform(text);
  if (sfc) {
    editor.edit((editBuilder) => {
      const { lineCount } = document;
      editBuilder.replace(new Range(0, 0, lineCount, 0), sfc);
      window.showInformationMessage(`成功生成表单！`);
    });
  }
}
