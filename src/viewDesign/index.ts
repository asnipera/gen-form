import { Componet, genRegisterComponentCurry } from "../utils/register";

const iviewComponentTemplates = new Map<string[], Componet>();
const registerComponents = genRegisterComponentCurry(iviewComponentTemplates);

registerComponents

export { iviewComponentTemplates };
