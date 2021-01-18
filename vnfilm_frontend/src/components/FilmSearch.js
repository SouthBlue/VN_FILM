import React, { useEffect, useState, useContext } from "react";
import ListFilm from "../components/ListFilm";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import filmApi from "../api/apiUtils/filmApi";
import Cookies from "js-cookie";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Context from "../store/context";
import { ACTION } from "../mylib/constant";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1100,
    minHeight: 600,
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
  paper2: {
    padding: theme.spacing(1),
    margin: theme.spacing(0.6),
    backgroundColor: theme.palette.primary.main,
    color: "red",
  },
}));
const FilmSearch = () => {
  const classes = useStyles();
  const history = useHistory();
  let { content } = useParams();
  const [film, setFilm] = useState();
  const { dispatchSearch } = useContext(Context);
  useEffect(() => {
    const account = Cookies.getJSON("account");
    if (
      account !== undefined &&
      account.token !== "" &&
      account.role === "admin"
    ) {
      history.replace("/admin");
    }
    dispatchSearch({
      type: ACTION.SET_SEARCH,
      data: { content: content.replaceAll("+", " ") },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, content]);
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const params = {
          content: content.replaceAll("+", " "),
        };
        const responseSearch = await filmApi.search(params);
        setFilm(responseSearch);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearch();
  }, [content]);
  return (
    film !== undefined && (
      <React.Fragment>
        <Container className={classes.root} fixed>
          <div className={classes.flex}>
            <div>
              <div className={classes.list}>
                <div className={classes.title}>
                  <h1 className={classes.text}>
                    Tìm kiếm: {content.replaceAll("+", " ")}
                  </h1>
                </div>
                {film.success ? (
                  <ListFilm listFilm={film.film_list} />
                ) : (
                  <Paper className={classes.paper2} variant="outlined" square>
                    <Typography variant="h5">
                      Không có kết quả tìm kiếm phù hợp
                    </Typography>
                  </Paper>
                )}
              </div>
            </div>
          </div>
          <div className={classes.flex}>
            <div>
              <div className={classes.list}>
                <div className={classes.title}>
                  <h1 className={classes.text}>Phim gợi ý cho bạn</h1>
                </div>
                <ListFilm listFilm={film.film_label} />
              </div>
            </div>
          </div>
        </Container>
      </React.Fragment>
    )
  );
};

export default FilmSearch;
