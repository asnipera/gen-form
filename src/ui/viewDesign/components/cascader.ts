export const alias = ["cascader", "级联", "级联选择"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<Cascader v-model="formState.${model}" :data="options" placeholder="" />`,
    key: model,
    value: [],
  };
};
export const cascader = {
  alias,
  value,
};
