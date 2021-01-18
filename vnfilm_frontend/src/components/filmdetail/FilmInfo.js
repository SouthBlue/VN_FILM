import React, { useState, useEffect, useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Link, useParams } from "react-router-dom";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Cookies from "js-cookie";
import markerApi from "../../api/apiUtils/markerApi";
import Context from "../../store/context";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 800,
    marginTop: theme.spacing(11),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 266,
    height: 390,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    maxWidth: 400,
    justifyContent: "space-between",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  title: {
    color: "#FFFF00",
    textTransform: "uppercase",
  },
  paper: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    height: 150,
    width: 500,
    backgroundColor: fade(theme.palette.common.white, 0.04),
    color: theme.palette.text.main,
  },
  button: {
    height: 70,
    width: 180,
    color: "black",
    backgroundColor: theme.palette.secondary.main,
    fontSize: 23,
  },
  button1: {
    height: 70,
    width: 180,
    color: "black",
    backgroundColor: theme.palette.secondary.main,
    fontSize: 18,
  },
  cardDes: {
    maxWidth: 800,
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
  },
}));

const FilmInfo = (props) => {
  const classes = useStyles();
  const { film_id } = useParams();
  const [marked, setMarked] = useState();
  const { acc } = useContext(Context);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const account = Cookies.getJSON("account");
    const fetchMarked = async () => {
      try {
        const data = {
          user_id: account.user_id,
          film_id: film_id,
        };
        const responseMarked = await markerApi.getCheck(data);
        if (responseMarked.found) {
          setMarked(true);
        } else {
          setMarked(false);
        }
      } catch (error) {
        setMarked(false);
      }
    };
    if (acc.token !== "") {
      fetchMarked();
    } else {
      setMarked(false);
    }
  }, [film_id, acc, isSubmitting]);
  useEffect(() => {
    const fetchAddMarked = async () => {
      try {
        const data = {
          user_id: acc.user_id,
          film_id: film_id,
        };
        const responseAddMarked = await markerApi.addMarker(data);
        if (responseAddMarked) {
          setIsSubmitting(false);
        }
      } catch (error) {
        setIsSubmitting();
      }
    };
    const fetchUnMarked = async () => {
      try {
        const data = {
          user_id: acc.user_id,
          film_id: film_id,
        };
        const responseunMarked = await markerApi.unMarked(data);
        if (responseunMarked) {
          setIsSubmitting(false);
        }
      } catch (error) {
        setIsSubmitting(false);
      }
    };
    if (isSubmitting === true && marked === false && acc.token !== "")
      fetchAddMarked();
    if (isSubmitting === true && marked === true && acc.token !== "")
      fetchUnMarked();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, marked, film_id]);
  const handleClick = () => {
    if (acc.token === "") {
      alert("Đăng nhập để thêm đánh dấu");
    }
    setIsSubmitting(true);
  };
  return (
    props.film !== undefined && (
      <div>
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            component="img"
            image={props.film.image}
            alt="Poster"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.title} component="h5" variant="h5">
                {props.film.film_name}
              </Typography>
              <Typography variant="subtitle1">
                {props.film.film_name_real}
              </Typography>
              <Paper className={classes.paper} variant="outlined" square>
                <Typography variant="body1">
                  Trạng thái: {props.film.status}
                </Typography>
                <Typography variant="body1">
                  Đạo diễn: {props.film.director}
                </Typography>
                <Typography variant="body1">Năm: {props.film.year}</Typography>
                <Typography variant="body1">
                  Thể loại: {props.film.category}
                </Typography>
              </Paper>
            </CardContent>
            <div className={classes.controls}>
              <Button
                component={Link}
                to={`/film/${props.film.film_id}/watch`}
                className={classes.button}
                variant="contained"
                startIcon={<PlayCircleOutlineIcon style={{fontSize: 30 }} />}
              >
                Xem phim
              </Button>
              <Button
                className={classes.button1}
                variant="contained"
                startIcon={
                  marked ? (
                    <BookmarkIcon style={{ fontSize: 30 }} />
                  ) : (
                    <BookmarkBorderIcon style={{ fontSize: 30 }} />
                  )
                }
                onClick={handleClick}
              >
                {marked ? "Bỏ đánh dấu" : "Đánh dấu"}
              </Button>
            </div>
          </div>
        </Card>
        <Card className={classes.cardDes}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} component="h6" variant="h6">
              Nội dung:
            </Typography>
            <Typography variant="body1">{props.film.description}</Typography>
          </CardContent>
        </Card>
      </div>
    )
  );
};
export default FilmInfo;
