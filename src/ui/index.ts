import { workspace } from "vscode";
import { ANT_DESIGN_VUE } from "../constant";
import { antComponentTemplates } from "./antDesignVue";
import { wrapAntCol, wrapAntForm, wrapAntFormItem, wrapAntRow } from "./antDesignVue/components/form";
import { viewDesignComponentTemplates } from "./viewDesign";
import { wrapViewDesignCol, wrapViewDesignForm, wrapViewDesignFormItem, wrapViewDesignRow } from "./viewDesign/components/form";
// 获取配置文件中设置的UI
function getConfigurationUI() {
  const config = workspace.getConfiguration();
  return config.get<string>("platform.UI");
}

function isAnt(ui: string | undefined) {
  if (ui) {
    return ui === ANT_DESIGN_VUE;
  }
  return true;
}

export function getComponentTemplates() {
  const ui = getConfigurationUI();
  const templates = isAnt(ui) ? antComponentTemplates : viewDesignComponentTemplates;
  return templates;
}

export function wrapFormContainer() {
  const ui = getConfigurationUI();
  return isAnt(ui) ? wrapAntForm : wrapViewDesignForm;
}

export function wrapFormItem() {
  const ui = getConfigurationUI();
  return isAnt(ui) ? wrapAntFormItem : wrapViewDesignFormItem;
}

export function wrapRow() {
  const ui = getConfigurationUI();
  return isAnt(ui) ? wrapAntRow : wrapViewDesignRow;
}

export function wrapCol() {
  const ui = getConfigurationUI();
  return isAnt(ui) ? wrapAntCol : wrapViewDesignCol;
}
