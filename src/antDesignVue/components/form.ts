export const slot = `<slot />`;

export const formItem = `
<a-form-item has-feedback label="" name="">
    ${slot}
</a-form-item>
`;

export const form = `
<a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
  ${slot}
</a-form>
`;

export function wrapFormItem(template: string) {
  return formItem.replace(slot, template);
}

export function wrapForm(template: string) {
  return form.replace(slot, template);
}
