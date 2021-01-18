import React, { useEffect, useContext } from "react";
import CarouselBar from "../components/Carousel";
import ListFilm from "../components/ListFilm";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Context from "../store/context";
import TopView from "../components/TopView";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
  },
  list: {
    maxWidth: 790,
    marginTop: theme.spacing(8),
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkBox: {
    padding: "35px 12px 5px 0px",
  },
  link: {
    color: theme.palette.secondary.main,
  },
  text: {
    color: theme.palette.secondary.main,
  },
  flex: {
    display: "flex",
  },
}));
const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { home } = useContext(Context);
  useEffect(() => {
    const account = Cookies.getJSON("account");
    if (
      account !== undefined &&
      account.token !== "" &&
      account.role === "admin"
    ) {
      history.replace("/admin");
    }
  },[history]);
  return (
    <React.Fragment>
      <Container className={classes.root} fixed>
        <CarouselBar />
        <div className={classes.flex}>
          <div>
            <div className={classes.list}>
              <div className={classes.title}>
                <h1 className={classes.text}>PHIM LẺ MỚI CẬP NHẬT</h1>
                <div className={classes.linkBox}>
                  <Link
                    to={"/type/single-movie/1"}
                    className={classes.link}
                    variant="body2"
                  >
                    Xem tất cả ►
                  </Link>
                </div>
              </div>

              <ListFilm listFilm={home.singleMovie} />
            </div>
            <div className={classes.list}>
              <div className={classes.title}>
                <h1 className={classes.text}>PHIM CHIẾU RẠP MỚI CẬP NHẬT</h1>
                <div className={classes.linkBox}>
                  <Link
                    to={"/type/series-movie/1"}
                    className={classes.link}
                    variant="body2"
                  >
                    Xem tất cả ►
                  </Link>
                </div>
              </div>
              <ListFilm listFilm={home.theaterMovie} />
            </div>
            <div className={classes.list}>
              <div className={classes.title}>
                <h1 className={classes.text}>PHIM BỘ MỚI CẬP NHẬT</h1>
                <div className={classes.linkBox}>
                  <Link
                    to={"/type/theater-movie/1"}
                    className={classes.link}
                    variant="body2"
                  >
                    Xem tất cả ►
                  </Link>
                </div>
              </div>
              <ListFilm listFilm={home.seriesMovie} />
            </div>
          </div>

          <TopView />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
