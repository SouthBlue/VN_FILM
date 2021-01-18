import { ACTION } from "../mylib/constant";
export const defaultAccount = {
  user_id: "",
  fullname: "",
  email: "",
  token: "",
  role: "",
};

// print b.xx == 2
export const AccReducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOGIN:
      return action.data;
    case ACTION.LOGOUT:
      return defaultAccount;
    case ACTION.LOGIN_BY_TOKEN:
      return action.data;

    default:
      return state;
  }
};
