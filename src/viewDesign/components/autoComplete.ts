import { Component } from "../../utils/register";

export const key = ["autoComplete", "complete", "auto", "自动完成", "自动"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<AutoComplete v-model="formState.${model}" placeholder="" :data="source${index}" />`,
    key: model,
    value: "",
    extra: `source${index}: [],`,
  };
};

export const autoComplete = {
  key,
  value,
};
