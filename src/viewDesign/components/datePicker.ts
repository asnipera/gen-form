import { Component } from "../../utils/register";

export const key = ["datePicker", "date", "日期", "日期选择框"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<DatePicker v-model="formState.${model}" placeholder="" />`,
    key: model,
    value: "",
  };
};

export const datePicker = {
  key,
  value,
};
