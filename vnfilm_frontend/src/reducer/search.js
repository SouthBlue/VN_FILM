import { ACTION } from "../mylib/constant";
export const defaultSearch = {
  content: "",
};

// print b.xx == 2
export const SearchReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_SEARCH:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};