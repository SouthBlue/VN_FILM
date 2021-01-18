import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ACTION } from "../mylib/constant";
import { validateLogin } from "../mylib/myFunc";

import userApi from "../api/apiUtils/userApi";
import Context from "../store/context";
import Cookies from "js-cookie";
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
    marginTop: theme.spacing(1),
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
  textf: {
    "& p": {
      color: "red",
      fontSize: 14,
    },
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const useForm = (validate) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const history = useHistory();
  // const location = useLocation();
  // const params = location.state.params;
  const { dispatchAcc } = useContext(Context);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateLogin(values));
    setStatus(null);
    setIsSubmitting(true);
  };

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const response = await userApi.login(values);
        if (response) {
          Cookies.set("account", response);
          dispatchAcc({ type: ACTION.LOGIN, data: response });
          //    localStorage.setItem("token", response.token);
          setStatus(null);
          // thanh cong
            history.push("/");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401)
            setStatus("Email hoặc mật khẩu không chính xác");
          if (error.response.status === 500) setStatus("Lỗi máy chủ");
        } else {
          setStatus("Không có kết nối tới máy chủ");
        }
        //console.log(error.response);
      }
    };
    if (Object.keys(errors).length === 0 && isSubmitting) {
      fetchLogin();
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
const Login = () => {
  const classes = useStyles();

  const { handleChange, handleSubmit, values, errors, status } = useForm(
    validateLogin
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography color="secondary" component="h1" variant="h4">
          Đăng nhập
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          {status && <p style={{ color: "red" }}>{status}</p>}

          <TextField
            className={classes.textf}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            color="secondary"
            value={values.email}
            helperText={errors.email}
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
          <TextField
            className={classes.textf}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            value={values.password}
            helperText={errors.password}
            autoComplete="current-password"
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

          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Đăng nhập
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link className={classes.text} to="/signup" variant="body1">
                {"Chưa có tài khoản? Đăng ký"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default Login;

// <FormControlLabel
//   className={classes.text}
//   control={<Checkbox value="remember" color="secondary" />}
//   label="Ghi nhớ đăng nhập"
// />
