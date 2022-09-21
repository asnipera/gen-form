import { Component } from "../../utils/register";

export const key = ["select", "下拉", "选择器"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `
    <Select v-model="formState.${model}" placeholder="">
      <Option value="">option</Option>
    </Select>
    `,
    key: model,
    value: "",
  };
};

export const select = {
  key,
  value,
};
