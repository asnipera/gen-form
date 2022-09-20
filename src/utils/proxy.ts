import { getEnterStr } from "./utils";

const envProxy = new Proxy(
  {
    enterFlag: "",
  },
  {
    get: function (target, propKey, receiver) {
      if (propKey === "enterFlag") {
        return getEnterStr();
      }
      return Reflect.get(target, propKey, receiver);
    },
  }
);

export { envProxy };
