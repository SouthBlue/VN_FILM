import React, { useEffect } from "react";
import Login from "../components/Login";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
const LoginPage = () => {
  const history = useHistory();
  useEffect(() => {
    const account = Cookies.getJSON("account");
    if (account.token !== "" && account.role !== "admin") {
      history.replace("/");
    }
    if (account.token !== "" && account.role === "admin") {
      history.replace("/admin");
    }
  }, [history]);
  return (
    <React.Fragment>
      <Login />
    </React.Fragment>
  );
};

export default LoginPage;
