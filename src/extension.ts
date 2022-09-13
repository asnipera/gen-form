// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "gen.form " is now active!');

  const subscriptions = vscode.commands.registerCommand("gen.form", () => {
    // 获取当前tab的内容
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const document = editor.document;
    const selection = editor.selection;
    const text = document.getText();
    // 读取package中configuration的字段
    const config = vscode.workspace.getConfiguration();
    const autoStart = config.get("form.autoStart");
    console.log(autoStart);

    //设置当前tabb的内容
    editor.edit((editBuilder) => {
      const form = genForm(text.split("\r\n"));
      editBuilder.replace(selection, form);
    });
  });

  context.subscriptions.push(subscriptions);
}

// this method is called when your extension is deactivated
export function deactivate() {}

const select = `
<a-select>
	<a-select-option>
		111
	</a-select-option>
</a-select>
`;

function genForm(componentTag: string[]) {
  const formStr: string[] = [];
  componentTag.forEach((component) => {
    switch (component.trim()) {
      case "input":
        formStr.push(`<a-input />`);
        break;
      case "select":
        formStr.push(select);
        break;
      default:
        break;
    }
  });

  return formStr.join("");
}
