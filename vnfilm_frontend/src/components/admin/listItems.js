import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MovieIcon from "@material-ui/icons/Movie";
import PeopleIcon from "@material-ui/icons/People";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import TheatersIcon from '@material-ui/icons/Theaters';
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
    height: 575
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icons: {
    color : theme.palette.text.main,
  }
}));
export const MainListItems = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <List>
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          component={Link} to="/admin"
        >
          <ListItemIcon>
            <DashboardIcon className ={classes.icons}/>
          </ListItemIcon>
          <ListItemText primary="Thống kê" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          component={Link} to="/admin/usermanager"
        >
          <ListItemIcon>
            <PeopleIcon className ={classes.icons}/>
          </ListItemIcon>
          <ListItemText primary="Quản lý người dùng" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <MovieIcon className ={classes.icons}/>
          </ListItemIcon>
          <ListItemText primary="Quản Lý phim" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <TheatersIcon className ={classes.icons}/>
              </ListItemIcon>
              <ListItemText primary="Danh sách phim" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
              component={Link} to="/admin/addfilm"
            >
              <ListItemIcon>
                <QueuePlayNextIcon className ={classes.icons}/>
              </ListItemIcon>
              <ListItemText primary="Thêm phim" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
};
