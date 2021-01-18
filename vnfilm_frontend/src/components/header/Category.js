import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../../store/context";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline",
  },
  paper: {
    zIndex: "tooltip",
  },
  myStyle: {
    zIndex: "tooltip",
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 840,
    backgroundColor: theme.palette.primary.main,
  },
  item: {
    color: theme.palette.text.main,
    width: "20%",
  },
  button: {
    color: theme.palette.text.main,
    fontSize: "18px",
  },
}));

const Category = (category) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { navbar } = useContext(Context);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <Button
        className={classes.button}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        Thể loại
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className={classes.myStyle}
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {navbar.category.map((cate) => (
                    <MenuItem
                      component={Link}
                      to={`/category/${cate.category_id}/1`}
                      className={classes.item}
                      key={cate.category_id}
                      value={cate.category_id}
                      onClick={handleClose}
                    >
                      {cate.category_name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};
export default Category;
