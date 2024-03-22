import NodeCache from "node-cache";
const myCache = new NodeCache({ stdTTL: 60000, checkperiod: 120 });

export const setToCache = (key: string, obj: any) => {
  myCache.set(key, obj);
};
export const getFromCache = (key: string) => {
  const value = myCache.get(key);
  if (value == undefined) {
    return false;
  }
  return value;
};