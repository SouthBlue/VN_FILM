import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import notfound from "../images/notfound.png";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));
const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <img src={notfound} alt="Not Found" />
      <h1 style={{ color: "#249FF2" }}>Trang không tồn tại</h1>
      <Link to="/" style={{ color: "#249FF2" }}>
        Về Trang chủ
      </Link>
    </div>
  );
};
export default NotFound;
