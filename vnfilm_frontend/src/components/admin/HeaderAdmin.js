import React, { useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import { MainListItems } from "./listItems";
import Context from "../../store/context";
import Cookies from "js-cookie";
import { ACTION } from "../../mylib/constant";
import { useHistory } from "react-router-dom";
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import logo from "../../images/logo.png";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.primary.main,
    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  memu: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  login: {
    width: theme.spacing(30),
    marginLeft: "auto",
    marginRight: 0,
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const { acc, dispatchAcc } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = () => {
    // localStorage.removeItem("token");
    dispatchAcc({ type: ACTION.LOGOUT });
    setAnchorEl(null);
    Cookies.set("account", { fullname: "", email: "", token: "", role: "" });
    history.push("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Trang quản trị
          </Typography>
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
                  open={open1}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClick} color="text">
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div></div>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <img height="50px" width="175px" src={logo} alt="Logo" />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider/>
        <MainListItems />
        <Divider/>
      </Drawer>
    </div>
  );
}
