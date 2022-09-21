import { Component } from "../../utils/register";

export const key = ["radio", "单选框", "单选"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `
    <RadioGroup v-model="formState.${model}">
      <Radio label="1">A</Radio>
      <Radio label="2">B</Radio>
    </RadioGroup>
    `,
    key: model,
    value: "1",
  };
};

export const radio = {
  key,
  value,
};
