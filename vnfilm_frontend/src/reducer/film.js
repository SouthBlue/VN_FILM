import { ACTION } from "../mylib/constant";
export const defaultFilm = {
  film_id: 0,
  film_name: "",
  film_name_real: "",
  status: "",
  director: "",
  year: 0,
  image: "",
  description: "",
  category: "",
};

// print b.xx == 2
export const FilmReducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOAD_FILM:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};