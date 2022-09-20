import { Component } from "../../utils/register";

export const key = ["treeSelect", "tree", "树", "树选择"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `
    <a-tree-select
        v-model:value="formState.${model}"
        show-search
        placeholder="Please select"
        allow-clear
        tree-default-expand-all
        :tree-data="treeData"
      >
        <template #title="{ value, title }">
          {{title}}-{{value}}
        </template>
      </a-tree-select>
    `,
    script: `
      const ${model} = ref('');
      const treeData = ref([]);
      `,
    key: model,
    value: "",
    extra: "const treeData = ref([]);",
  };
};

export const treeSelect = {
  key,
  value,
};
