import { window, EndOfLine, workspace } from "vscode";
import { genFormStr } from "./genFormStr";
import $ = require("gogocode");
import {
  FORM_SELECTOR,
  TEMPLATE_SELECTOR,
  VUE2_SCRIPT_SELECTOR,
  VUE3_SCRIPT_SELECTOR,
  VUE3_SETUP_REG,
  ZERO_INDENT_START_TAGS,
} from "../constant";
import { Componet, ComponetMap } from "../types/component";

export function genRegisterComponentCurry(map: ComponetMap) {
  return function ({ key, value }: { key: string[]; value: Componet }) {
    map.set(key, value);
  };
}

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

function isEmptyNode(node: $.GoGoAST) {
  // @ts-ignore
  return !node[0];
}

function replaceScript(ast: $.GoGoAST, source: string, formScriptStr: string) {
  const scriptAst = getScriptAst(ast, source);
  if (isEmptyNode(scriptAst)) {
    window.showWarningMessage("The script block is empty, please check the code");
    return;
  }
  if (isVue3(source)) {
    scriptAst.append("program.body", formScriptStr);
  } else {
    const objStr = formScriptStr.slice(1, -1);
    const dataStr = `data(){return{$$$, ${objStr}}}`;
    scriptAst.replace("data(){return{$$$}}", dataStr);
  }
}

//sort blocks by source position
function buildBlocks(lines: string[]) {
  const zeroIndentTagRegx = ZERO_INDENT_START_TAGS.map((tag) => new RegExp(`^${tag}.*?>`));
  const blocks: { key: string; start: string }[] = [];
  let start = "";
  lines.forEach((line, index) => {
    const isZeroIndentTag = zeroIndentTagRegx.some((reg) => reg.test(line));
    start += line.length + index;
    if (isZeroIndentTag) {
      if (line.includes("template")) {
        blocks.push({
          key: "template",
          start,
        });
      } else if (line.includes("script")) {
        const key = line.includes("setup") ? "scriptSetup" : "script";
        blocks.push({
          key,
          start,
        });
      }
    }
  });

  return blocks;
}

function sortSourceBlock(ast: $.GoGoAST, source: string) {
  const lines = source.split(getEnterStr());
  const blocks = buildBlocks(lines);
  blocks.forEach(({ key, start }) => {
    ast.attr(`${key}.start`, start);
  });
}

export function transform(source: string) {
  const ast = $(source, { parseOptions: { language: "vue" } });
  const templateAst = ast.find(TEMPLATE_SELECTOR);
  const selectorConfigration = getConfiguration(FORM_SELECTOR)!;
  const formAst = templateAst.find(selectorConfigration);
  // @ts-ignore
  const formNode = formAst[0];
  if (!formNode) {
    process.exit();
  }
  const formStr = formNode.match.$$$$[0].content.value.content;
  const [formTemplate, formScriptStr] = genFormStr(formStr, source);

  templateAst.replace(selectorConfigration, formTemplate);
  replaceScript(ast, source, formScriptStr);
  sortSourceBlock(ast, source);

  return ast.generate();
}
