import { Componet } from "../../../utils/register";

export const key = ["timerPicker", "timer", "时间选择框", "时间"];

export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<TimePicker v-model="formState.${model}" format="HH’mm’ss" />`,
    key: model,
    value: "",
  };
};
export const timerPicker = {
  key,
  value,
};
