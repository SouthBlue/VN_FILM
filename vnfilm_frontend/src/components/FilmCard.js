import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import Context from "../store/context";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 185,
    backgroundColor: "#282828",
    position: "relative",
    overflow: "visible",
  },
  media: {
    height: 271,
  },
  cardcontent: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    padding: 7,
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
  },
  cardcontent1: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    padding: "1px 7px 7px",
    color: "#8A8A8A",
    fontSize: 13,
  },
  ribbon: {
    borderRadius: "5px 30px 30px 5px",
    backgroundColor: "red",
    position: "absolute",
    color: "white",
    width: 75,
    zIndex: 3,
    textAlign: "center",
    textTransform: "uppercase",
    padding: 5,
    font: "Lato",
    "&:after": {
      position: "absolute",
      zIndex: 1,
      content: "",
      display: "block",
      border: "5px solid #2980b9",
    },
    top: 20,
  },
}));

const FilmCard = (props) => {
  const classes = useStyles();
  const { home } = useContext(Context);
  return (
    props.data !== undefined && (
      <Card className={classes.card}>
        <CardActionArea
          component={Link}
          to={`/film/${props.data.film_id}`}
          title={`${props.data.film_name} - ${props.data.film_name_real}`}
        >
          <div className={classes.ribbon}>
            <span className={classes.span}>{props.data.status}</span>
          </div>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Contemplative Reptile"
            image={`${home.fileHost}${props.data.image}`}
          />
          <CardContent className={classes.cardcontent}>
            {props.data.film_name}
          </CardContent>
          <CardContent className={classes.cardcontent1}>
            {props.data.film_name_real}
          </CardContent>
        </CardActionArea>
      </Card>
    )
  );
};

export default FilmCard;
