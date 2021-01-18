import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import {  makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Context from "../../store/context";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import filmApi from "../../api/apiUtils/filmApi";
import { validateUploadFilm } from "../../mylib/myFunc";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex-end",
    marginBottom: theme.spacing(5),
    "& > *": {
      width: 208,
      height: 307,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
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
    height: 1000,
  },
  text: {
    marginBottom: theme.spacing(2),
    "& p": {
      color: "red",
    },
  },
  formControl: {
    minWidth: 150,
  },
  formHelperText: {
    marginLeft: theme.spacing(2),
    color: "red",
  },
  button: {
    marginLeft: theme.spacing(2),
    width: 120,
  },
  button1: {
    width: 120,
  },
  label: {
    width: 120,
  },
  image: {
    width: 208,
    height: 305,
  },
  formControl1: {
    height: 300,
  },
  formGroup: {
    marginLeft: theme.spacing(2),
  },
  noti: {
    marginRight: theme.spacing(5),
    color: "red",
  },
  boxCate:{
    
  }
}));
const defaultProps = {
  borderColor: "text.primary",
  border: 1,
  style: { width: "auto", height: "auto" },
};
const AddFilm = () => {
  const classes = useStyles();
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { navbar } = useContext(Context);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    film_name: "",
    film_name_real: "",
    status: "",
    director: "",
    type_id: "",
    country_id: "",
    year: "",
    image: undefined,
    description: "",
    tag: "",
    category: [],
  });

  useEffect(() => {
    const account = Cookies.getJSON("account");
    if (account.role !== "admin") {
      history.replace("/");
    }
  }, [history]);

  const handleChange = (event) => {
    if (event.target.files[0])
      setValues({ ...values, image: event.target.files[0] });
  };
  const handleChangeCheck = (event) => {
    if (event.target.checked) {
      const newcate = values.category;
      newcate.push(event.target.value);
      setValues({ ...values, category: newcate });
    } else {
      const newcate = values.category.filter((c) => c !== event.target.value);
      setValues({ ...values, category: newcate });
    }
  };
  const handleChangeText = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateUploadFilm(values));
    setIsSubmitting(true);
    setIsSuccess("");
  };

  const handleReset = () => {
    setValues({
      film_name: "",
      film_name_real: "",
      status: "",
      director: "",
      type_id: "",
      country_id: "",
      year: "",
      image: undefined,
      description: "",
      tag: "",
      category: [],
    });
    setErrors({});
    setIsSubmitting(false);
    setIsSuccess("");
  };
  useEffect(() => {
    const fetchUpload = async () => {
      let formData = new FormData();

      formData.append("film_name", values.film_name);
      formData.append("film_name_real", values.film_name_real);
      formData.append("status", values.status);
      formData.append("director", values.director);
      formData.append("type_id", values.type_id);
      formData.append("country_id", values.country_id);
      formData.append("year", values.year);
      formData.append("image", values.image);
      formData.append("description", values.description);
      formData.append("tag", values.tag);
      formData.append("category", values.category.toString());

      try {
        const responseUpload = await filmApi.upload(formData);
        if (responseUpload) setIsSuccess("Thêm phim thành công");
      } catch (error) {
        setIsSuccess("Thêm phim thất bại");
      }
    };
    if (Object.keys(errors).length === 0 && isSubmitting) {
      fetchUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);
  return (
    <div className={classes.content}>
      <main>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h4" className={classes.text}>
                  Thêm Phim
                </Typography>
                <Divider className={classes.text} />
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={4} direction="row">
                    <Grid item xs>
                      <Grid container direction="column">
                        <TextField
                          className={classes.text}
                          variant="outlined"
                          id="film_name"
                          label="Tên phim (Tiếng Việt)"
                          name="film_name"
                          value={values.film_name}
                          onChange={handleChangeText}
                          helperText={errors.film_name}
                        />
                        <TextField
                          className={classes.text}
                          variant="outlined"
                          id="film_name_real"
                          label="Tên phim gốc"
                          name="film_name_real"
                          value={values.film_name_real}
                          onChange={handleChangeText}
                        />
                        <TextField
                          className={classes.text}
                          variant="outlined"
                          id="director"
                          label="Đạo diễn"
                          name="director"
                          value={values.director}
                          onChange={handleChangeText}
                        />
                        <Grid container spacing={4} direction="row">
                          <Grid item xs={4}>
                            <TextField
                              className={classes.text}
                              variant="outlined"
                              id="status"
                              label="Trạng Thái"
                              name="status"
                              value={values.status}
                              helperText={errors.status}
                              onChange={handleChangeText}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <InputLabel id="type_id">Loại phim</InputLabel>
                              <Select
                                labelId="type_id"
                                id="type_id"
                                name="type_id"
                                value={values.type_id}
                                onChange={handleChangeText}
                                label="Loại phim"
                              >
                                {navbar.type.map((type) => (
                                  <MenuItem
                                    key={type.type_id}
                                    value={type.type_id}
                                  >
                                    {type.type_name}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText
                                className={classes.formHelperText}
                              >
                                {errors.type_id}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Grid container spacing={4} direction="row">
                          <Grid item xs={4}>
                            <TextField
                              className={classes.text}
                              variant="outlined"
                              id="year"
                              label="Năm"
                              name="year"
                              value={values.year}
                              helperText={errors.year}
                              onChange={handleChangeText}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <InputLabel id="country_id">Quốc gia</InputLabel>
                              <Select
                                labelId="country_id"
                                id="country_id"
                                name="country_id"
                                value={values.country_id}
                                onChange={handleChangeText}
                                label="Quốc gia"
                              >
                                {navbar.country.map((country) => (
                                  <MenuItem
                                    key={country.country_id}
                                    value={country.country_id}
                                  >
                                    {country.country_name}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText
                                className={classes.formHelperText}
                              >
                                {errors.country_id}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              className={classes.text}
                              variant="outlined"
                              id="tag"
                              label="Tag"
                              name="tag"
                              value={values.tag}
                              helperText={errors.tag}
                              onChange={handleChangeText}
                            />
                          </Grid>
                        </Grid>
                        <Typography variant="body1">Thể loại</Typography>
                        <Box borderRadius="borderRadius" {...defaultProps}>
                          <FormGroup row className={classes.formGroup}>
                            {navbar.category.map((category) => (
                              <FormControlLabel
                                // id={`category_${category.category_id}`}
                                value={category.category_id}
                                key={category.category_id}
                                control={<Checkbox />}
                                label={category.category_name}
                                name={`category_${category.category_id}`}
                                onChange={handleChangeCheck}
                                checked={
                                  values.category.indexOf(
                                    `${category.category_id}`
                                  ) >= 0
                                }
                              />
                            ))}
                          </FormGroup>
                        </Box>
                        <FormHelperText className={classes.formHelperText}>
                          {errors.category}
                        </FormHelperText>
                      </Grid>
                    </Grid>

                    <Grid item xs={6}>
                      <Grid container direction="column">
                        <input
                          accept="image/*"
                          className={classes.input}
                          style={{ display: "none" }}
                          id="image"
                          multiple
                          type="file"
                          onChange={handleChange}
                        />

                        <div className={classes.root}>
                          <Paper variant="outlined" square>
                            {values.image && (
                              <img
                                className={classes.image}
                                src={URL.createObjectURL(values.image)}
                                alt="Upload file"
                              />
                            )}
                          </Paper>
                          <label htmlFor="image" className={classes.label}>
                            <Button
                              variant="contained"
                              component="span"
                              width="120px"
                              //className={classes.button1}
                              color="secondary"
                              startIcon={<CropOriginalIcon />}
                            >
                              Chọn ảnh
                            </Button>
                            <FormHelperText className={classes.formHelperText}>
                              {errors.image}
                            </FormHelperText>
                          </label>
                        </div>

                        <TextField
                          className={classes.text}
                          variant="outlined"
                          id="description"
                          label="Nội dung phim"
                          multiline
                          rows={13}
                          name="description"
                          helperText={errors.description}
                          value={values.description}
                          onChange={handleChangeText}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Typography className={classes.noti} variant="body1">
                      {isSuccess}
                    </Typography>
                    <Button
                      className={classes.button1}
                      color="secondary"
                      variant="contained"
                      onClick={handleReset}
                    >
                      Làm mới
                    </Button>
                    <Button
                      className={classes.button}
                      color="secondary"
                      variant="contained"
                      type="submit"
                    >
                      Lưu
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default AddFilm;
