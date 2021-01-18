import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useParams, useHistory } from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import FilmInfo from "../components/filmdetail/FilmInfo";
import filmApi from "../api/apiUtils/filmApi";
import NotFound from "./NotFound";
import TopView from "../components/TopView";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
    display: "flex",
  }
}))
const FilmDetail = () => {
  const classes = useStyles();
  let { film_id } = useParams();
  const [film, setFilm] = useState(undefined);
  const [isSuccess, setIsSuccess] = useState(true);
  const history = useHistory();
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
  useEffect(() => {
    const fetchFilmInfo = async () => {
      try {
        const responseFilmInfo = await filmApi.getone(film_id);
        if (responseFilmInfo) {
          setFilm(responseFilmInfo);
          setIsSuccess(true);
        }
      } catch (error) {
        setIsSuccess(false);
        console.log(error);
      }
    };
    fetchFilmInfo();
  }, [film_id]);
  return film !== undefined ? (
    <React.Fragment>
      <Container className = {classes.root}>
        <FilmInfo film={film} />
        <TopView/>
      </Container>
    </React.Fragment>
  ) : (
    !isSuccess && <NotFound />
  );
};

export default FilmDetail;
