export const alias = ["timerPicker", "timer", "时间选择框", "时间"];

export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<TimePicker v-model="formState.${model}" format="HH’mm’ss" />`,
    key: model,
    value: "",
  };
};
export const timerPicker = {
  alias,
  value,
};
