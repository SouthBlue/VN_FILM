import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import FilmTopCard from "./FilmTopCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    height: 740,
    overflow: "auto"
  },
}));

const ListTopView = (props) => {
  const classes = useStyles();


  return (
    <Grid container className={classes.root} spacing={1}>
        {props.listTopView.map((value) => (
          <Grid key={value.film_id} item>
            <FilmTopCard data={value} />
          </Grid>
        ))}
    </Grid>
  );
};
export default ListTopView;
