export const alias = ["inputNumber", "数字", "数字输入框"];

export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<InputNumber v-model="formState.${model}" />`,
    key: model,
    value: 0,
  };
};
export const inputNumber = {
  alias,
  value,
};
