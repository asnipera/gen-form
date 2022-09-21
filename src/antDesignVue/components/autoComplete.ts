import { Component } from "../../utils/register";

export const key = ["autoComplete", "complete", "auto", "自动完成", "自动"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<a-auto-complete v-model:value="formState.${model}" placeholder="" />`,
    script: `const ${model} = ref('');`,
    key: model,
    value: "",
  };
};

export const autoComplete = {
  key,
  value,
};
