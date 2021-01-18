import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MovieIcon from "@material-ui/icons/Movie";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import adminApi from "../../api/apiUtils/adminApi";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  depositContext: {
    flex: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    backgroundColor: fade(theme.palette.common.white, 0.5),
    height: 160,
  },
  title: {
    color: "#000040",
    textTransform: "uppercase",
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [total, setTotal] = useState();

  useEffect(() => {
    const account = Cookies.getJSON("account");

    const fetchTotal = async () => {
      try {
        const responseTotal = await adminApi.getTotal();
        setTotal(responseTotal);
      } catch (error) {
        console.log(error);
      }
    };
    if (account.role !== "admin") history.replace("/");
    else fetchTotal();
  }, [history]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    total !== undefined && (
      <div className={classes.content}>
        <main>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <AccountBoxIcon style={{ color: "#008040", fontSize: 40 }} />
                  <Typography
                    className={classes.title}
                    component="h2"
                    variant="h6"
                    gutterBottom
                  >
                    Thành viên
                  </Typography>
                  <Typography component="p" variant="h4">
                    {total.user}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <MovieIcon style={{ color: "#F20079", fontSize: 40 }} />
                  <Typography
                    className={classes.title}
                    component="h2"
                    variant="h6"
                    gutterBottom
                  >
                    Số bộ phim
                  </Typography>
                  <Typography component="p" variant="h4">
                    {total.film}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <GroupWorkIcon style={{ color: "#F56F11", fontSize: 40 }} />
                  <Typography
                    className={classes.title}
                    component="h2"
                    variant="h6"
                    gutterBottom
                  >
                    Số tập phim
                  </Typography>
                  <Typography component="p" variant="h4">
                    {total.episode}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    )
  );
};
export default Dashboard;
