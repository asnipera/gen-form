import { window, EndOfLine, workspace } from "vscode";
import { genFormStr } from "./genFormStr";
import $ = require("gogocode");
import { FORM_SELECTOR, TEMPLATE_SELECTOR, VUE2_SCRIPT_SELECTOR, VUE3_SCRIPT_SELECTOR, VUE3_SETUP_REG } from "../constant";

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

export function isVue3(source: string) {
  return VUE3_SETUP_REG.test(source);
}

function getScriptAst(ast: $.GoGoAST, source: string) {
  const isV3 = isVue3(source);
  const selector = isV3 ? VUE3_SCRIPT_SELECTOR : VUE2_SCRIPT_SELECTOR;
  return ast.find(selector);
}

function replaceScript(ast: $.GoGoAST, source: string, formStateStr: string) {
  const scriptAst = getScriptAst(ast, source);
  if (isVue3(source)) {
    return "";
  } else {
    const objStr = formStateStr.slice(1, -1);
    const dataStr = `data(){return{$$$, ${objStr}}}`;
    scriptAst.replace("data(){return{$$$}}", dataStr);
  }
}

export function transform(source: string) {
  const ast = $(source, { parseOptions: { language: "vue" } });
  const templateAst = ast.find(TEMPLATE_SELECTOR);
  const selectorConfigration = getConfiguration(FORM_SELECTOR)!;
  const formAst = templateAst.find(selectorConfigration);
  // @ts-ignore
  const formStr = formAst[0].match.$$$$[0].content.value.content;
  const [formTemplate, formStateStr] = genFormStr(formStr, source);

  templateAst.replace(selectorConfigration, formTemplate);
  replaceScript(ast, source, formStateStr);
  return ast.generate();
}
