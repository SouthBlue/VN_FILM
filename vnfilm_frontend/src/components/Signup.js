import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { validateSignup } from "../mylib/myFunc";
import userApi from "../api/apiUtils/userApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    color: theme.palette.text.main,
  },
  cssLabel: {
    color: theme.palette.text.main,
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.secondary.main} !important`,
    },
    color: theme.palette.text.main,
  },

  cssFocused: {
    color: theme.palette.text.main,
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${theme.palette.text.main} !important`,
  },
  textField: {
    color: theme.palette.text.main,
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: 200,
  },
  textf: {
    "& p": {
      color: "red",
      fontSize: 14,
    },
  },
}));

const useForm = (validate) => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "1990-01-01",
    sex: "m",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const history = useHistory();

  const fetchSignup = async () => {
    try {
      const response = await userApi.signup(values);
      if (response) {
        // thanh cong
        alert("Đăng ký thành công vui lòng đăng nhập để tiếp tục!");
        history.push("/login", {
          params: "Đăng ký thành công vui lòng đăng nhập để tiếp tục",
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) setStatus("Email đã tồn tại");
        if (error.response.status === 500) setStatus("Lỗi máy chủ");
      } else {
        setStatus("Không có kết nối tới máy chủ");
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateSignup(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      fetchSignup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    status,
  };
};
const SignUp = () => {
  const classes = useStyles();

  const { handleChange, handleSubmit, values, errors, status } = useForm(
    validateSignup
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography color="secondary" component="h1" variant="h4">
          Đăng ký
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {status && <p style={{ color: "red" }}>{status}</p>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.textf}
                variant="outlined"
                required
                autoFocus
                fullWidth
                id="fullname"
                label="Họ và Tên"
                value={values.fullname}
                helperText={errors.fullname}
                name="fullname"
                autoComplete="lname"
                color="secondary"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textf}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={values.email}
                helperText={errors.email}
                color="secondary"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textf}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                helperText={errors.password}
                color="secondary"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textf}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label=" Xác nhận mật khẩu"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={values.confirmPassword}
                helperText={errors.confirmPassword}
                color="secondary"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                id="birthday"
                label="Ngày sinh:"
                type="date"
                name="birthday"
                value={values.birthday}
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                  },
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel className={classes.text} component="legend">
                Giới tính:
              </FormLabel>
              <RadioGroup
                className={classes.text}
                row
                value={values.sex}
                aria-label="gender"
                name="sex"
                onChange={handleChange}
              >
                <FormControlLabel value="m" control={<Radio />} label="Nam" />
                <FormControlLabel value="f" control={<Radio />} label="Nữ" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Đăng ký
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link className={classes.text} to="/login" variant="body2">
                Đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default SignUp;
