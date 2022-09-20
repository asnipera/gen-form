import { Selection, Range, TextEditor, window, EndOfLine, workspace } from "vscode";
import { INLINE_SPLIT } from "../constant";
import { getTemplates } from "../ui";
import { envProxy } from "./proxy";
import { Componet } from "./register";

// 拆分每行的标签
export function parseTagStr(tagStr: string, separator: string) {
  return tagStr
    .split(separator)
    .map((tag) => tag.trim())
    .filter((tag) => tag);
}

function isSigleTag(tagStr: string) {
  return !tagStr.includes(INLINE_SPLIT);
}

// 根据tag获取key
function getKeyByTag(templates: Map<string[], Componet>, tag: string) {
  return Array.from(templates.keys()).find((key) => key.includes(tag));
}

function genSigleTagTmpl(tagName: string) {
  let value: Componet | undefined;
  const templates = getTemplates();
  const key = getKeyByTag(templates, tagName);
  if (key) {
    value = templates.get(key);
  }
  return value;
}

function genMutipleTagTmpl(tagStr: string) {
  const tags = parseTagStr(tagStr, INLINE_SPLIT);
  return tags.map((tag) => {
    return genSigleTagTmpl(tag);
  });
}

function getTagTemplate(tagInstance: Componet | undefined, index: number) {
  if (tagInstance) {
    const { template } = tagInstance(index.toString());
    return template;
  }
  return "";
}

export function genFormStr(tagStr: string) {
  const tags = parseTagStr(tagStr, envProxy.enterFlag);
  const tagList = tags.map((tag, index) => {
    if (isSigleTag(tag)) {
      const tagInstance = genSigleTagTmpl(tag);
      return getTagTemplate(tagInstance, index);
    } else {
      const tagInstances = genMutipleTagTmpl(tag);
      if (tagInstances) {
        return tagInstances.map((tagInstance) => {
          return getTagTemplate(tagInstance, index);
        });
      }
    }
  });

  const a = tagList.flat();
  return a.filter((tag) => tag).join("");
}
