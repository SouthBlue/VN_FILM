import React, { useEffect, useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import imgUser from "../images/user.png";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import userApi from "../api/apiUtils/userApi";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Context from "../store/context";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1100,
    marginTop: theme.spacing(11),
  },
  avatar: {
    maxWidth: 150,
    maxHeight: 150,
  },
  title: {
    textTransform: "uppercase",
    color: theme.palette.secondary.main,
  },
  infoBox: {
    marginTop: theme.spacing(8),
    display: "flex",
  },
  typeBox: {
    padding: "0px 100px 0px 100px",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: theme.palette.text.main,
  },
  face: {
    marginTop: theme.spacing(1),
    display: "flex",
  },
  icon: {
    color: theme.palette.text.main,
  },
  changePass: {
    color: theme.palette.text.main,
    "&:hover": {
      color: "red !important",
    },
  },
}));
const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const [info, setInfo] = useState(undefined);
  const {acc} = useContext(Context);
  useEffect(() => {
    const account = Cookies.getJSON("account");
    if (account.token === "" && account.role !== "admin") {
      history.replace("/");
    }
    if (account.token !== "" && account.role === "admin") {
      history.replace("/admin");
    }
    const fetchInfo = async () => {
      try {
        const responseInfo = await userApi.get(account.user_id);
        if (responseInfo) {
          setInfo(responseInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, [history, acc]);

  return (
    info !== undefined && (
      <React.Fragment>
        <Container className={classes.root}>
          <div>
            <h1 className={classes.title}>Thông tin cá nhân</h1>
          </div>
          <div className={classes.infoBox}>
            <img className={classes.avatar} src={imgUser} alt="Avatar" />
            <div className={classes.typeBox}>
              <Typography className={classes.text} variant="h6" gutterBottom>
                Họ và tên: {info.fullname}
              </Typography>
              <Typography className={classes.text} variant="h6" gutterBottom>
                Ngày sinh: {info.birthday}
              </Typography>
              <Typography className={classes.text} variant="h6" gutterBottom>
                Giới tính: {info.sex}
              </Typography>

              <div className={classes.face}>
                <Typography
                  component={Link}
                  to={"/user/pass"}
                  className={classes.changePass}
                  variant="h6"
                  gutterBottom
                >
                  Đổi mật khẩu
                </Typography>
                <div className={classes.icon}>
                  {<NavigateNextIcon fontSize="large" />}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </React.Fragment>
    )
  );
};
export default Profile;
