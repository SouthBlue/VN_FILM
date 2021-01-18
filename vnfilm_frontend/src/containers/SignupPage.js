import React, {useEffect} from "react";
import Signup from "../components/Signup";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
const SignupPage = () => {
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
      <Signup />
    </React.Fragment>
  );
};

export default SignupPage;
