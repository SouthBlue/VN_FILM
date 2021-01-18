import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import Category from "./Category";
import Country from "./Country";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    display: "flex",
    maxWidth: 1100,
    justifyContent: "space-between",
  },
  button: {
    color: theme.palette.text.main,
    fontSize: "18px",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  // console.log(navbar)
  return (
    <Container className={classes.toolbarSecondary}>
      <Button
        component={Link}
        to="/"
        className={classes.button}
        startIcon={<HomeIcon />}
      >
        Trang chủ
      </Button>
      {<Category />}
      {<Country />}
      <Button component={Link} to="/type/single-movie/1" className={classes.button}>
        Phim lẻ
      </Button>
      <Button component={Link} to="/type/series-movie/1" className={classes.button}>Phim bộ</Button>
      <Button component={Link} to="/type/theater-movie/1" className={classes.button}>Phim chiếu rạp</Button>
    </Container>
  );
};
export default NavBar;
