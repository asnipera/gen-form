import { Selection, Range, TextEditor, window, EndOfLine, workspace } from "vscode";
import { INLINE_SPLIT } from "../constant";
import { getComponentTemplates, wrapCol, wrapFormContainer, wrapFormItem, wrapRow } from "../ui";
import { envProxy } from "./proxy";
import { Componet, ComponetMap } from "./register";

// 拆分每行的标签
export function parseTagStr(tagStr: string, separator: string) {
  return tagStr
    .split(separator)
    .map((tag) => tag.trim())
    .filter((tag) => tag);
}

function isSingleTag(tagStr: string) {
  return !tagStr.includes(INLINE_SPLIT);
}

function getSigleTagTmpl(templates: ComponetMap, tagName: string) {
  let value: Componet | undefined;
  templates.forEach((tmpl, key) => {
    if (!value && key.includes(tagName)) {
      value = tmpl;
    }
  });
  return value;
}

function genMutipleTagTmpl(templates: ComponetMap, tagStr: string) {
  const tags = parseTagStr(tagStr, INLINE_SPLIT);
  return tags.map((tag) => {
    return getSigleTagTmpl(templates, tag);
  });
}

function getTagTemplate(tagInstance: Componet | undefined, index: string) {
  if (tagInstance) {
    const { template } = tagInstance(index);
    return template;
  }
  return "";
}

function wrapFormItemContainer(tmpl: string, index: string) {
  const formItem = wrapFormItem();
  return formItem(tmpl, index);
}

function isString(value: any): value is string {
  return typeof value === "string";
}

function wrapRowContainer(colItems: (string | string[] | undefined)[]) {
  const wrapRowFun = wrapRow();
  return colItems.map((colItem) => {
    if (colItem === undefined) {
      return [];
    }
    let colItemStr = colItem;
    if (Array.isArray(colItemStr)) {
      colItemStr = colItemStr.reduce((total, cur) => total + cur);
    }
    return wrapRowFun(colItemStr);
  });
}

function genColItemWithOneTag(tagInstance: Componet | undefined, index: string, span = 24) {
  const tagTemplate = getTagTemplate(tagInstance, index);
  const formItem = wrapFormItemContainer(tagTemplate, index);
  const wrapColContainer = wrapCol();
  return wrapColContainer(span, formItem);
}

export function genFormStr(tagStr: string) {
  const tags = parseTagStr(tagStr, envProxy.enterFlag);
  const templates = getComponentTemplates();
  const tagList = tags.map((tag, i) => {
    if (isSingleTag(tag)) {
      const tagInstance = getSigleTagTmpl(templates, tag);
      return genColItemWithOneTag(tagInstance, (i + 1).toString());
    } else {
      const tagInstances = genMutipleTagTmpl(templates, tag);
      if (tagInstances) {
        const span = Math.floor(24 / tagInstances.length);
        return tagInstances.map((tagInstance, j) => genColItemWithOneTag(tagInstance, `${i + 1}_${j + 1}`, span));
      }
    }
  });

  const rowItems = wrapRowContainer(tagList);
  const formContainer = wrapFormContainer();
  return formContainer(rowItems.flat().filter((tag) => tag) as string[]);
}
