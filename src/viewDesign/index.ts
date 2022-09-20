import { Component, genRegisterComponentCurry } from "../utils/register";

const iviewComponentTemplates = new Map<string[], Component>();
const registerComponents = genRegisterComponentCurry(iviewComponentTemplates);

registerComponents

export { iviewComponentTemplates };
