import { FORM_STATE, INLINE_SPLIT, RULES } from "../constant";
import { getComponentTemplates, wrapCol, wrapFormContainer, wrapFormItem, wrapRow } from "../ui";
import { envProxy } from "./proxy";
import { isVue3 } from "./utils";

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

function pushToFormState(formState: Record<string, any>, tagInstance: Componet | undefined, index: string) {
  if (!tagInstance) {
    return;
  }
  const { key, value, extra } = tagInstance(index);
  formState[key] = value;
  return extra;
}

function genFormScript(formState: Record<string, any>, extraFormConstants: string[], source: string) {
  const formStateStr = JSON.stringify(formState);
  if (!isVue3(source)) {
    return JSON.stringify(formState);
  }
  let scriptStr = [FORM_STATE.replace(/object/, formStateStr)];
  scriptStr.push(envProxy.enterFlag);
  scriptStr.push(RULES);
  scriptStr.push(envProxy.enterFlag);
  scriptStr.push(...extraFormConstants);
  return scriptStr.join("");
}

export function buildForm(tagStr: string, source: string) {
  const tags = parseTagStr(tagStr, envProxy.enterFlag);
  const templates = getComponentTemplates();
  const formState = {};
  const extraFormConstants: string[] = [];
  const tagList = tags.map((tag, i) => {
    const index = (i + 1).toString();
    if (isSingleTag(tag)) {
      const tagInstance = getSigleTagTmpl(templates, tag);
      const extra = pushToFormState(formState, tagInstance, index);
      extra && extraFormConstants.push(extra);
      return genColItemWithOneTag(tagInstance, index);
    } else {
      const tagInstances = genMutipleTagTmpl(templates, tag);
      if (tagInstances) {
        const span = Math.floor(24 / tagInstances.length);
        return tagInstances.map((tagInstance, j) => {
          const i = `${index}_${j + 1}`;
          const extra = pushToFormState(formState, tagInstance, i);
          extra && extraFormConstants.push(extra);
          return genColItemWithOneTag(tagInstance, i, span);
        });
      }
    }
  });

  const rowItems = wrapRowContainer(tagList);
  const formContainer = wrapFormContainer();
  const formScriptStr = genFormScript(formState, extraFormConstants, source);
  const formTemplate = formContainer(rowItems.flat().filter((tag) => tag) as string[]);
  return [formTemplate, formScriptStr];
}
