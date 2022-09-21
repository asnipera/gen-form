export const alias = ["treeSelect", "tree", "树", "树选择"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  const treeData = `treeData${index}`;
  return {
    template: [
      `<a-tree-select
        v-model:value="formState.${model}"
        show-search
        placeholder="Please select"
        allow-clear
        tree-default-expand-all
        :tree-data="${treeData}"
      >`,
      `<template #title="{ value, title }">
          {{title}}-{{value}}
        </template>
      </a-tree-select>
    `,
    ].join(""),
    key: model,
    value: "",
    v3Datas: [`const ${treeData} = ref([]);`],
    v2Datas: {
      [treeData]: [],
    },
  };
};

export const treeSelect = {
  alias,
  value,
};
