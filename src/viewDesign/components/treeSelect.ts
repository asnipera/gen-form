import { Component } from "../../utils/register";

export const key = ["treeSelect", "tree", "树", "树选择"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<TreeSelect v-model="formState.${model}" placeholder="" :data="source${index}" />`,
    key: model,
    value: [],
    extra: `source${index}: [],`,
  };
};

export const treeSelect = {
  key,
  value,
};
