export const alias = ["treeSelect", "tree", "树", "树选择"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: "<to-do />",
    key: model,
    value: "",
    extra: "const treeData = ref([]);",
  };
};

export const treeSelect = {
  alias,
  value,
};
