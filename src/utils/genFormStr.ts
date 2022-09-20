import { Selection, Range, TextEditor, window, EndOfLine, workspace } from "vscode";
import { INLINE_SPLIT } from "../constant";
import { getTemplates, wrapCol, wrapForm, wrapFormItem, wrapRow } from "../ui";
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

function genSigleTagTmpl(templates: ComponetMap, tagName: string) {
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
    return genSigleTagTmpl(templates, tag);
  });
}

function getTagTemplate(tagInstance: Componet | undefined, index: string) {
  if (tagInstance) {
    const { template } = tagInstance(index);
    return template;
  }
  return "";
}

function genFormItem(tmpl: string, index: string) {
  const formItem = wrapFormItem();
  return formItem(tmpl, index);
}

function isString(value: any): value is string {
  return typeof value === "string";
}

function genRowItem(colItems: (string | string[] | undefined)[]) {
  return colItems.map((colItem) => {
    if (colItem === undefined) {
      return [];
    }
    const wrapRowFun = wrapRow();
    if (isString(colItem)) {
      return wrapRowFun(colItem);
    }
    const colItems = colItem.map((item) => wrapRowFun(item));
    return colItems;
  });
}

function genColItemWithOneTag(tagInstance: Componet | undefined, index: string, span = 24) {
  const tagTemplate = getTagTemplate(tagInstance, index);
  const formItem = genFormItem(tagTemplate, index);
  const wrapColFun = wrapCol();
  return wrapColFun(span, formItem);
}

export function genFormStr(tagStr: string) {
  const tags = parseTagStr(tagStr, envProxy.enterFlag);
  const templates = getTemplates();
  const tagList = tags.map((tag, i) => {
    if (isSingleTag(tag)) {
      const tagInstance = genSigleTagTmpl(templates, tag);
      return genColItemWithOneTag(tagInstance, (i + 1).toString());
    } else {
      const tagInstances = genMutipleTagTmpl(templates, tag);
      if (tagInstances) {
        const span = Math.floor(24 / tagInstances.length);
        return tagInstances.map((tagInstance, j) => genColItemWithOneTag(tagInstance, `${i + 1}_${j + 1}`, span));
      }
    }
  });

  const rowList = genRowItem(tagList);
  const wrapFormFun = wrapForm();
  return wrapFormFun(rowList.flat().filter((tag) => tag) as string[]);
}
