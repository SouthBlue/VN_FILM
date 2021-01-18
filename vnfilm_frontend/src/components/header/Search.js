import React, { useContext, useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Context from "../../store/context";
const useStyles = makeStyles((theme) => ({
  search: {
    margin: "auto",
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
    },
  },
  button: {
    height: 39,
    color: theme.palette.text.main,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: "red !important",
    },
  },
}));
const Search = () => {
  const classes = useStyles();
  const history = useHistory();
  const { search } = useContext(Context);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (search.content !== "") {
      setValue(search.content);
    }
  }, [search]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.search.value.trim().replace(/\s+/g, "+");
    if (content === "") {
      alert("Vui lòng nhập nội dung tìm kiếm");
    } else {
      history.replace(`/search/${content}`);
    }
  };
  return (
    <Box className={classes.search}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={classes.searchIcon}>
          <SearchIcon color={"secondary"} />
        </div>
        <InputBase
          placeholder="Tìm kiếm"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          name="search"
          value={value}
          onChange={handleChange}
        />
        <Button className={classes.button} type="submit">
          Tìm
        </Button>
      </form>
    </Box>
  );
};
export default Search;
