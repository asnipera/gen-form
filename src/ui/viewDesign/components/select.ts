export const alias = ["select", "下拉", "选择器"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: [
      `<Select v-model:value="formState.${model}" placeholder="">`,
      '<Option value="">option</Option>',
      "</Select>",
    ].join(""),
    key: model,
    value: "",
  };
};

export const select = {
  alias,
  value,
};
