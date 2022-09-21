import { Component } from "../../utils/register";

export const key = ["checkbox", "多选框", "多选", "复选"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<Checkbox v-model="formState.${model}">Checkbox</Checkbox>`,
    key: model,
    value: false,
  };
};

export const checkbox = {
  key,
  value,
};
