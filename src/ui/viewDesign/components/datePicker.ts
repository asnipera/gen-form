export const alias = ["datePicker", "date", "日期", "日期选择框"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<DatePicker  v-model="formState.${model}" placeholder="" />`,
    key: model,
    value: "",
  };
};

export const datePicker = {
  alias,
  value,
};
