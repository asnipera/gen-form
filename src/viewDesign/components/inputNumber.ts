import { Component } from "../../utils/register";

export const key = ["inputNumber", "数字", "数字输入框"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<InputNumber v-model="formState.${model}" placeholder="" />`,
    key: model,
    value: 0,
  };
};

export const inputNumber = {
  key,
  value,
};
