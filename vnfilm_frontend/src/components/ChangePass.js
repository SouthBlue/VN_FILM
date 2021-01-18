import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { validatePass } from "../mylib/myFunc";
import userApi from "../api/apiUtils/userApi";
import Cookies from "js-cookie";
import Context from "../store/context";
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
  smbutton: {
    marginTop: theme.spacing(3),
  },
}));

const useForm = (validate) => {
  const [values, setValues] = useState({
    password: "",
    newpass: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const history = useHistory();
  const {acc} = useContext(Context);
  useEffect(() => {
    const account = Cookies.getJSON("account");
    if (account.token === "" && account.role !== "admin") {
      history.replace("/");
    }
    if (account.token !== "" && account.role === "admin") {
      history.replace("/admin");
    }
  }, [history, acc]);
  const fetchChangePass = async () => {
    try {
      const account = Cookies.getJSON("account");
      const data = {
        password: values.password,
        newpass: values.newpass,
      };
      const response = await userApi.changePass(account.user_id, data);
      if (response) {
        // thanh cong
        setStatus("Thay đổi mật khẩu thành công");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401)
          setStatus("Mật khẩu không chính xác");
        if (error.response.status === 500) setStatus("Lỗi máy chủ");
      } else setStatus("Thay đổi mật khẩu thất bại");
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
    setStatus(null);
    setErrors(validatePass(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      fetchChangePass();
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
const ChangePass = () => {
  const classes = useStyles();

  const { handleChange, handleSubmit, values, errors, status } = useForm(
    validatePass
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography color="secondary" component="h1" variant="h4">
          Đổi mật khẩu
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {status && <p style={{ color: "red" }}>{status}</p>}
          <Grid container spacing={2}>
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
                name="newpass"
                label="Mật khẩu mới"
                type="password"
                id="newpass"
                autoComplete="current-password"
                value={values.newpass}
                helperText={errors.newpass}
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
          </Grid>
          <Button
            className={classes.smbutton}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Đổi mật khẩu
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default ChangePass;
