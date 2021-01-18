import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    backgroundColor: "#282828",
  },
  details: {
    width: 180,
    flexDirection: "column",
  },
  cover: {
    minWidth: 99,
    height: 146,
  },
  title: {
    padding: "5px 10px 0px 15px",
    fontSize: 14,
    textTransform: "uppercase",
    color: "white",
  },
  title1: {
    padding: "5px 10px 0px 15px",
    fontSize: 13,
    color: "#8A8A8A",
  },
  title3: {
    padding: "5px 10px 0px 15px",
    color: "white",
    marginTop: theme.spacing(1),
    fontSize: 13,
  },
}));

const FilmTopCard = (props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea className={classes.root} component={Link} to={`/film/${props.data.film_id}`}>
        <CardMedia
          className={classes.cover}
          image={process.env.REACT_APP_API_URL + "files/" + props.data.image}
          title={`${props.data.film_name} - ${props.data.film_name_real}`}
        />
        <div className={classes.details}>
          <CardContent className={classes.title}>
            {props.data.film_name}
          </CardContent>
          <CardContent className={classes.title1}>
            {props.data.film_name_real}
          </CardContent>
          <CardContent className={classes.title3}>
            Lượt xem: {props.data.num_view}
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};
export default FilmTopCard;
