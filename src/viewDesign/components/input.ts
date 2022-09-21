import { Component } from "../../utils/register";

export const key = ["input", "输入框"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<Input v-model="formState.${model}" placeholder="" />`,
    key: model,
    value: "",
  };
};

export const input = {
  key,
  value,
};
