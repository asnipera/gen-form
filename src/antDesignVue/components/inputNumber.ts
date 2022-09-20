import { Component } from "../../utils/register";

export const key = ["inputNumber", "数字", "数字输入框"];

export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<a-input-number v-model:value="formState.${model}" />`,
    script: `const  ${model}  = ref(0);`,
    key: model,
    value: 0,
  };
};
export const inputNumber = {
  key,
  value,
};
