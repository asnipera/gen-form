export const key = ["input", "输入框"];
export const value: Componet = function (index: string) {
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
