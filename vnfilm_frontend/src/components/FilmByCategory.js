import React, { useEffect, useState } from "react";
import ListFilm from "../components/ListFilm";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { useParams, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import filmApi from "../api/apiUtils/filmApi";
import NotFound from "../containers/NotFound";
import Pagination from "@material-ui/lab/Pagination";
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
  boxpage: {
    borderRadius: theme.spacing(0.8),
    backgroundColor: "#DDDDDD",
  },
}));
const FilmByCategory = () => {
  const classes = useStyles();
  const history = useHistory();
  let { category_id, page } = useParams();
  const [film, setFilm] = useState();
  const [isSuccess, setIsSuccess] = useState(true);
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
  const handleChangePage = (event, newPage) => {
    history.replace(`/category/${category_id}/${newPage}`);
    window[`scrollTo`]({ top: 200, behavior: `smooth` });
  };
  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const params = {
          page: parseInt(page, 10),
        };
        const responseByCategory = await filmApi.getByCategory(
          category_id,
          params
        );
        if (responseByCategory) {
          setFilm(responseByCategory);
          setIsSuccess(true);
        }
      } catch (error) {
        setIsSuccess(false);
        console.log(error);
      }
    };
    fetchByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category_id, page]);
  return film !== undefined ? (
    <React.Fragment>
      <Container className={classes.root} fixed>
        <div className={classes.flex}>
          <div>
            <div className={classes.list}>
              <div className={classes.title}>
                <h1 className={classes.text}>{film.category_name}</h1>
              </div>

              <ListFilm listFilm={film.film_list} />
            </div>
          </div>
        </div>
        <div className={classes.pagination}>
          <div className={classes.boxpage}>
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
    !isSuccess && <NotFound />
  );
};

export default FilmByCategory;
