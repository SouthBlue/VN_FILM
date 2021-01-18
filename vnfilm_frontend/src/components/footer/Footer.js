import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import EmailIcon from "@material-ui/icons/Email";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    height: 200,
    backgroundColor: theme.palette.primary.main,
  },
  main: {
    maxWidth: 1200,
    display: "flex",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    overflow: "hidden",
    color: theme.palette.text.main,
  },
  img: {
    maxHeight: 87,
    maxWidth: 260,
  },
  typeBox: {
    padding: "0px 100px 0px 100px",
    display: "flex",
    flexDirection: "column",
  },
  contacts: {
    padding: "0px 100px 0px 100px",
    display: "flex",
    flexDirection: "column",
  },
  textType: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      color: "red !important",
    },
  },
  textTop: {
    color: "#FFFF00",
  },
  face: {
    marginTop: theme.spacing(1),
    display: "flex",
  },
  textLink: {
    color: "#139CF8",
    textDecoration: "none",
  },
  icon: {
    color: "#139CF8",
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.main}>
        <img className={classes.img} src={logo} alt="logo" />
        <div className={classes.typeBox}>
          <Typography
            component={Link}
            to={"/type/single-movie/1"}
            className={classes.textType}
            variant="h6"
            gutterBottom
          >
            Phim lẻ
          </Typography>
          <Typography
            component={Link}
            to={"/type/series-movie/1"}
            className={classes.textType}
            variant="h6"
            gutterBottom
          >
            Phim bộ
          </Typography>
          <Typography
            component={Link}
            to={"/type/theater-movie/1"}
            className={classes.textType}
            variant="h6"
            gutterBottom
          >
            Phim chiếu rạp
          </Typography>
        </div>
        <div className={classes.contacts}>
          <Typography className={classes.textTop} variant="h5">
            Liên hệ
          </Typography>
          <div className={classes.face}>
            <div>{<EmailIcon />}</div>
            <Typography variant="body1">vnam98@gmail.com</Typography>
          </div>
          <div className={classes.face}>
            <div className={classes.icon}>{<FacebookIcon />}</div>
            <Typography
              className={classes.textLink}
              component="a"
              target="_blank"
              href="https://www.facebook.com/giangvietnam/"
              variant="body1"
            >
              Facebook
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
