import { ISaveData } from "../interfaces/ISaveData.interface";

import { defaultData, localStorageKey } from "../data/constants.data";

export const loadData = () => {
  const data =
    localStorage.getItem(localStorageKey) || JSON.stringify(defaultData);
  const parsed: ISaveData = JSON.parse(data);
  return parsed;
};
