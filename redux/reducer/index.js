import { ACTIONS } from "../action";

const entries = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ENTRY:
      return {
        ...state,
        ...action.entry,
      };
    //   break;
    case ACTIONS.RECIVE_ENTRIES:
      return {
        ...state,
        ...action.entries,
      };
    //   break;

    default:
      return { ...state };
  }
};

export default entries;
