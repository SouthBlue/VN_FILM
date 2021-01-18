import React, {useContext} from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ListTopView from "./ListTopView";
import Context from "../store/context";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p = {1}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background,
    maxWidth: 325,
    height: 800,
    marginTop: theme.spacing(11),
    marginLeft: theme.spacing(5),
  },
  bar: {
    position: "static",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const TopView = () => {
  const classes = useStyles();
  const {topView} = useContext(Context);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Top phim lẻ" {...a11yProps(0)} />
          <Tab label="Top phim bộ" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
      //  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ListTopView listTopView = {topView.topSingle}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListTopView listTopView = {topView.topSeries}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};
export default TopView;
