import { ACTIONS } from "../action";

export const reciveEnytries = (entries) => {
  return {
    type: ACTIONS.RECIVE_ENTRIES,
    entries,
  };
};

export const addEntry = (entry) => {
  return {
    type: ACTIONS.ADD_ENTRY,
    entry,
  };
};
