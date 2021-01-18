import { ACTION } from "../mylib/constant";
export const defaultNavBar = {
  category: [],
  country: [],
  type: [],
};

// print b.xx == 2
export const NavBarReducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOAD_CATE_COUNTRY:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
