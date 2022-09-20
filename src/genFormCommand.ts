import * as vscode from "vscode";
import { replaceEditorByFormFlag, replaceEditorBySelection } from "./utils";
import $ = require("gogocode");
import { genFormStr } from "./utils/genFormStr";
import * as fs from "fs";

// function transform(fileInfo, api, options) {
//   const $ = api.gogocode;
//   const source = fileInfo.source;
//   const ast = $(source, { parseOptions: { language: "vue" } });
//   const template = ast.find("<template></template>");
//   const script = ast.find("<script></script>");

//   template.replace("input", "<div>123</div>");
//   script.replace("const a = $_$", "const a = 2").generate();
//   // return your transformed code here
//   return ast.generate();
// }

function transform(fileInfo: any, api: any, options: any) {
  const $ = api.gogocode;
  const source = fileInfo.source;
  const ast = $(source, { parseOptions: { language: "vue" } });
  const template = ast.find("<template></template>");

  const formStr = template.find("<xx id='f'>$$$</xx>")[0].match.$$$$[0].content.value.content;
  template.replace("<xx>$$$</xx>", genFormStr(formStr));
  // return your transformed code here
  return ast.generate();
}

export function genFormCommand(args: any) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const document = editor.document;
  const selection = editor.selection;
  const text = document.getText();
  const filePath = args?.fsPath || vscode.window.activeTextEditor?.document?.fileName;
  const newcode = transform({ source: text }, { gogocode: $ }, {});
  fs.promises.writeFile(filePath, newcode).then(() => {
    vscode.window.showInformationMessage(`文件：${filePath} 已经成功替换`);
  });

  // if (selection.isEmpty) {
  //   replaceEditorByFormFlag(text, editor);
  // } else {
  //   replaceEditorBySelection(text, selection, editor);
  // }
}
