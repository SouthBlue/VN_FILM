import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import NavBar from "./Nav-bar";
import { ACTION } from "../../mylib/constant";
import logo from "../../images/logo.png";
import Context from "../../store/context";
import Cookies from "js-cookie";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    padding: theme.spacing(1),
    maxWidth: 1150,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    flexGrow: 1,
  },
  logoImg: {
    maxWidth: 150,
  },
  search: {
    maxWidth: 300,
    padding: theme.spacing(1),
  },
  login: {
    width: theme.spacing(30),
    marginLeft: "auto",
    marginRight: 0,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "scroll",
  },
  link1: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },
  link2: {
    marginLeft: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  link3: {
    color: theme.palette.secondary.main,
  },
  button: {
    color: theme.palette.text.main,
    fontSize: "18px",
  },
  memu: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  item: { width: "25%" },
  text: {
    color: theme.palette.secondary.main,
  },
  linklog: {
    paddingTop: theme.spacing(2),
  },
}));

const MenuAppBar = () => {
  const classes = useStyles();

  const { acc, dispatchAcc } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = () => {
    // localStorage.removeItem("token");
    dispatchAcc({ type: ACTION.LOGOUT });
    setAnchorEl(null);
    Cookies.set("account", {user_id: null, fullname: "", email: "", token: "", role: "" });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container className={classes.toolbar}>
          <Link to="/">
            <div className={classes.title}>
              <img className={classes.logoImg} src={logo} alt="Logo" />
            </div>
          </Link>
          <Container className={classes.search}>
            <Search />
          </Container>
          <Grid className={classes.login} container justify="flex-end">
            {acc.token ? (
              <div>
                <em className={classes.link3}>{acc.fullname}</em>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="secondary"
                >
                  <AccountCircle />
                </IconButton>
                <Menu

                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                 <MenuItem
                    component={Link}
                    to={"/marked/1"}
                    color="text"
                    onClick={handleClose}
                  >
                    Phim đánh dấu
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={"/user/profile"}
                    color="text"
                    onClick={handleClose}
                  >
                    Tài khoản
                  </MenuItem>
                  <MenuItem onClick={handleClick} color="text">
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div className={classes.linklog}>
                <Link
                  className={classes.link1}
                  variant="body2"
                  to="/login"
                  activeclass="is-active"
                >
                  Đăng nhập
                </Link>
                |
                <Link
                  className={classes.link2}
                  variant="body2"
                  to="/signup"
                  activeclass="is-active"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </Grid>
        </Container>
        <NavBar />
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
