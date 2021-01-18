import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Player, BigPlayButton } from "video-react";
import { Link, useParams } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import videoNotFound from "../../images/404video.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    marginTop: theme.spacing(11),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
    padding: theme.spacing(1),
  },
  head: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    maxWidth: 630,
    flex: "1 0 auto",
  },
  cover: {
    width: 199,
    height: 292,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  title: {
    color: "#FFFF00",
    textTransform: "uppercase",
  },
  paper: {
    overflow: "auto",
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    height: 180,
    maxWidth: 600,
    backgroundColor: fade(theme.palette.common.white, 0.04),
    color: theme.palette.text.main,
  },
  player: {
    marginTop: theme.spacing(2),
    width: "100%",
    height: "100%",
  },
  paper1: {
    overflow: "auto",
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    height: 100,
    width: "100%",
    backgroundColor: fade(theme.palette.common.white, 0.04),
    color: theme.palette.text.main,
  },
  episode: {
    marginTop: theme.spacing(3),
    color: "#FFFF00",
    textTransform: "uppercase",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    padding: theme.spacing(1),
  },
  listItem: {
    width: "auto",
    color: theme.palette.text.main,
    backgroundColor: fade(theme.palette.common.white, 0.1),
    margin: theme.spacing(0.6),
    borderRadius: 5,
    "&.Mui-selected": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&:hover": {
      backgroundColor: "red !important",
    },
  },
  paper2: {
    padding: theme.spacing(1),
    margin: theme.spacing(0.6),
    backgroundColor: "#DDDDDD",
    color: "red",
  },
  img: {
    marginTop: theme.spacing(2),
    width: "100%",
    maxHeight: 500,
  },
}));

const FilmPlay = (props) => {
  const classes = useStyles();
  let { episode } = useParams();
  const [episodeNum, setEpisodeNum] = useState(-1);
  useEffect(() => {
    if (episode === "watch") {
      setEpisodeNum(
        // eslint-disable-next-line eqeqeq
        props.film.episode_list.findIndex((x) => x.episode === 1)
      );
    } else {
      setEpisodeNum(
        // eslint-disable-next-line eqeqeq
        props.film.episode_list.findIndex((x) => x.episode == episode)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode]);
  useEffect(() => {
    window[`scrollTo`]({ top: 500, behavior: `smooth` });
  },[]);
  return (
    props.film !== undefined && (
      <Card className={classes.root}>
        <div className={classes.head}>
          <CardMedia
            className={classes.cover}
            container="img"
            image={props.film.image}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.title} component="h5" variant="h5">
                Xem phim {props.film.film_name}
              </Typography>
              <Typography variant="subtitle1">
                Xem phim {props.film.film_name_real}
              </Typography>
              <Paper className={classes.paper} variant="outlined" square>
                <Typography variant="body2">
                  {props.film.description}
                </Typography>
              </Paper>
            </CardContent>
          </div>
        </div>
        {episodeNum !== -1 ? (
          <Player
            className={classes.player}
            playsInline
            autoPlay={true}
            src={
              process.env.REACT_APP_API_URL +
              props.film.episode_list[episodeNum].content
            }
          >
            <BigPlayButton position="center" />
          </Player>
        ) : (
          <img className={classes.img} src={videoNotFound} alt="Not found" />
        )}

        <Typography className={classes.episode} component="h6" variant="h6">
          chọn tập:
        </Typography>
        {props.film.episode_list.length > 0 ? (
          <List className={classes.list}>
            {props.film.episode_list.map((value) => (
              <ListItem
                button
                key={value.episode}
                className={classes.listItem}
                selected={
                  episodeNum !== -1 &&
                  value.episode === props.film.episode_list[episodeNum].episode
                }
                component={Link}
                to={`/film/${props.film.film_id}/${value.episode}`}
              >
                <ListItemText primary={value.episode_name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Paper className={classes.paper2} variant="outlined" square>
            <Typography variant="subtitle1">
              Phim chưa cập nhật vui lòng quay lại sau!
            </Typography>
          </Paper>
        )}
      </Card>
    )
  );
};
export default FilmPlay;
