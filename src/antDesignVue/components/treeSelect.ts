export const key = ['treeSelect', 'tree', '树', '树选择'];
export const value = `
<a-tree-select
    v-model:value="value"
    show-search
    placeholder="Please select"
    allow-clear
    tree-default-expand-all
    :tree-data="treeData"
  >
    <template #title="{ value: val, title }">
      <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
      <template v-else>{{ title }}</template>
    </template>
  </a-tree-select>
`;

export const treeSelect = {
  key,
  value,
};
