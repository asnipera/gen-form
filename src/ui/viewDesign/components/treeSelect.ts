export const alias = ["treeSelect", "tree", "树", "树选择"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  const treeData = `treeData${index}`;
  return {
    template: "<to-do />",
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
