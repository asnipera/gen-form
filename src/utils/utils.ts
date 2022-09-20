import { Selection, Range, TextEditor, window, EndOfLine, workspace } from "vscode";
import { genFormStr } from "./genFormStr";
import $ = require("gogocode");

export function getEnterStr(): string {
  const editor = window.activeTextEditor;
  if (!editor) {
    return "";
  }
  const document = editor!.document;
  return document.eol === EndOfLine.LF ? "\n" : "\r\n";
}

export function removeLastIndexEnter(str: string) {
  return str.replace(new RegExp(`${getEnterStr()}$`), "");
}

export function genMutipleLineTmpl(tmpl: string[]) {
  const enter = getEnterStr();
  return removeLastIndexEnter(tmpl.join(""));
}

// 获取配置文件中设置的UI
export function getConfiguration(key: string) {
  const config = workspace.getConfiguration();
  return config.get<string>(key);
}

export function transform(source: string) {
  const ast = $(source, { parseOptions: { language: "vue" } });
  const template = ast.find("<template></template>");
  const selectorConfigration = getConfiguration("platform.Selector")!;
  const formAst = template.find(selectorConfigration);
  // @ts-ignore
  const formStr = formAst[0].match.$$$$[0].content.value.content;
  const newCode = genFormStr(formStr);
  console.log(newCode);

  template.replace(selectorConfigration, newCode);
  return ast.generate();
}
