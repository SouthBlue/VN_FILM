import { ACTION } from "../mylib/constant";

export const defaultHomePage = {
  fileHost: "",
  singleMovie: [],
  seriesMovie: [],
  theaterMovie: [],
};

export const HomePageReducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOAD_HOMEPAGE:
      return action.data;
    default:
      return state;
  }
};
