import { Component } from "../../utils/register";

export const key = ["cascader", "级联", "级联选择"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<Cascader v-model="formState.${model}" placeholder="" :data="source${index}" />`,
    key: model,
    value: [],
    extra: `source${index}: [],`,
  };
};

export const cascader = {
  key,
  value,
};
