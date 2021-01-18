import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import userApi from "../../api/apiUtils/userApi";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
const columns = [
  { id: "user_id", label: "ID", minWidth: 50 },
  { id: "fullname", label: "Họ và Tên", minWidth: 200 },
  { id: "email", label: "Email", minWidth: 200 },
  {
    id: "birthday",
    label: "Ngày sinh",
    minWidth: 100,
  },
  {
    id: "sex",
    label: "Giới tính",
    minWidth: 100,
  },
  {
    id: "role",
    label: "Quyền",
    minWidth: 100,
  },
];
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
  depositContext: {
    flex: 1,
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    backgroundColor: fade(theme.palette.common.white, 0.6),
    height: 550,
  },
  title: {
    color: "#000040",
    textTransform: "uppercase",
  },
  container1: {
    maxHeight: 460,
  },
}));

const UserTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState();
  useEffect(() => {
    const account = Cookies.getJSON("account");
    if (account.role !== "admin") history.replace("/");
  }, [history]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseUser = await userApi.getAll();
        if (responseUser) {
          setUsers(responseUser.list_user);
        }
      } catch (error) {
       // console.log(error);
      }
    };
    fetchUser();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    users !== undefined && (
      <div className={classes.content}>
        <main>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <TableContainer className={classes.container1}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((user) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={user.user_id}
                              >
                                {columns.map((column) => {
                                  const value = user[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    labelRowsPerPage= "Số hàng mỗi trang:"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    )
  );
};
export default UserTable;
