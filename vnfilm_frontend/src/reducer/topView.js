import { ACTION } from "../mylib/constant";

export const defaultTopView = {
  topSingle: [],
  topSeries: [],
};

export const TopViewReducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOAD_TOP_VIEW:
      return action.data;
    default:
      return state;
  }
};
