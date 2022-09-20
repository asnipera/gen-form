export const slot = `<slot />`;

function formItem(slot: string, name: string) {
  return `
  <FormItem label="${name}">
      ${slot}
  </FormItem >
`;
}

export const form = `
<Form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    :label-width="80"
  >
  ${slot}
</Form>
`;

const col = function (span: number, formItem: string) {
  return `
  <Col :span="${span}">
      ${formItem}
  </Col>
  `;
};

const row = `
  <Row :gutter="24">
      ${slot}
  </Row>
  `;

export function wrapViewDesignFormItem(template: string, name: string) {
  return formItem(template, name);
}

export function wrapViewDesignForm(template: string[]) {
  return form.replace(slot, template.join(""));
}

export function wrapViewDesignRow(col: string) {
  return row.replace(slot, col);
}

export function wrapViewDesignCol(span: number, formItem: string) {
  return col(span, formItem);
}
