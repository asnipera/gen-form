export const alias = ["autoComplete ", "complete", "auto", "自动完成", "自动"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<AutoComplete v-model="formState.${model}" placeholder="" />`,
    key: model,
    value: "",
  };
};

export const autoComplete = {
  alias,
  value,
};
