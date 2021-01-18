import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { useParams, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import markerApi from "../api/apiUtils/markerApi";
import Pagination from "@material-ui/lab/Pagination";
import Context from "../store/context";
import Grid from "@material-ui/core/Grid";
import FilmCard from "./FilmCard";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import filmImg from "../images/film.png";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1100,
  },
  list: {
    marginTop: theme.spacing(9),
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
    textTransform: "uppercase",
    color: theme.palette.secondary.main,
  },
  flex: {
    display: "flex",
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  },
  test: {
    borderRadius: theme.spacing(0.8),
    backgroundColor: "#DDDDDD",
  },
  listFilm: {
    flexGrow: 1,
  },
  button: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: "red !important",
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    height: "60vh",
    overflow: "auto",
  },
  img: {
    maxWidth: 256,
    maxHeight: 256,
  },
  div: {
    backgroundColor: "#282828",
    width: "100%",
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.7),
  },
}));
const FilmMarked = () => {
  const classes = useStyles();
  const history = useHistory();
  let { page } = useParams();
  const [film, setFilm] = useState();
  const [isSuccess, setIsSuccess] = useState(true);
  const [del, setDel] = useState();
  const [flag, setFlag] = useState(true);
  const { acc } = useContext(Context);
  useEffect(() => {
    const account = Cookies.getJSON("account");
    if (account.token === "" && account.role !== "admin") {
      history.replace("/");
    }
    if (account.token !== "" && account.role === "admin") {
      history.replace("/admin");
    }
  }, [history, acc]);
  const handleChangePage = (event, newPage) => {
    history.replace(`/marked/${newPage}`);
    window[`scrollTo`]({ top: 200, behavior: `smooth` });
  };
  useEffect(() => {
    const fetchMarkedByUser = async () => {
      try {
        const params = {
          page: parseInt(page, 10),
        };
        const responseMarked = await markerApi.getAllByUser(
          acc.user_id,
          params
        );
        if (responseMarked.status) setFilm(responseMarked);
        else {
          setFilm(undefined);
          setIsSuccess(responseMarked.status);
        }
      } catch (error) {
        setIsSuccess(false);
      }
    };
    if (acc.token !== "") {
      fetchMarkedByUser();
    }
  }, [acc, page, flag]);
  useEffect(() => {
    const fetchUnMarked = async () => {
      try {
        const data = {
          user_id: acc.user_id,
          film_id: del,
        };
        const responseunMarked = await markerApi.unMarked(data);
        if (responseunMarked) {
          setFlag(!flag);
        }
      } catch (error) {
        setDel(!flag);
      }
    };
    if (del !== undefined) fetchUnMarked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del]);
  const handleClick = (event) => {
    const con = window.confirm("Bạn chắc chắn muốn bỏ đánh dấu phim này?");
    if (con) {
      setDel(parseInt(event.currentTarget.id, 10));
    }
  };
  return film !== undefined ? (
    <React.Fragment>
      <Container className={classes.root} fixed>
        <div className={classes.flex}>
          <div>
            <div className={classes.list}>
              <div className={classes.title}>
                <h1 className={classes.text}>Phim đã đánh dấu</h1>
              </div>
              <Grid container className={classes.listFilm} spacing={2}>
                <Grid container spacing={2}>
                  {film.film_list.map((value) => (
                    <Grid key={value.film_id} item>
                      <div className = {classes.div}>
                        <DeleteForeverIcon
                          id={value.film_id}
                          className={classes.button}
                          onClick={handleClick}
                        />
                      </div>

                      <FilmCard data={value} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classes.pagination}>
          <div className={classes.test}>
            <Pagination
              count={
                film.count % 15 === 0
                  ? Math.floor(film.count / 15)
                  : Math.floor(film.count / 15) + 1
              }
              page={parseInt(page, 10)}
              color="secondary"
              shape="rounded"
              onChange={handleChangePage}
            />
          </div>
        </div>
      </Container>
    </React.Fragment>
  ) : (
    !isSuccess && (
      <div className={classes.paper}>
        <img className={classes.img} src={filmImg} alt="filmlogo" />
        <h1 className={classes.link}>Không có bộ phim nào được đánh dấu</h1>
      </div>
    )
  );
};

export default FilmMarked;
