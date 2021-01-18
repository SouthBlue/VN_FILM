import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import FilmCard from "./FilmCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const ListFilm = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid container spacing={2}>
        {props.listFilm.map((value) => (
          <Grid key={value.film_id} item>
            <FilmCard data={value} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default ListFilm;
