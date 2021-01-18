import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline"
  },
  paper: {
    zIndex: "tooltip"
  },
  myStyle: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    width: '500px'
  },
  item: { width: "25%" }
}));

const MenuListComposition= () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
    <div className={classes.root}>
      <div className={classes.root}>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Toggle Menu Grow
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    className={classes.myStyle}
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem className={classes.item}>Profile</MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      My account
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      Logout
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      Profile
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      My account
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      My account
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      Logout
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      Profile
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      My account
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      My account
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      Logout
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      Profile
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={handleClose}>
                      My account
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
export default MenuListComposition;