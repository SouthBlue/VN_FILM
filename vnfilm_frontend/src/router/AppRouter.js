import React, { useReducer, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/header/Header";
import HomePage from "../containers/HomePage";
import LoginPage from "../containers/LoginPage";
import SignupPage from "../containers/SignupPage";
import NotFound from "../containers/NotFound";
import { defaultAccount, AccReducer } from "../reducer/account";
import { defaultNavBar, NavBarReducer } from "../reducer/navbar";
import { defaultHomePage, HomePageReducer } from "../reducer/homePage";
import { defaultTopView, TopViewReducer } from "../reducer/topView";
import {defaultSearch, SearchReducer} from "../reducer/search";
import Cookies from "js-cookie";
import Context from "../store/context";
import { ACTION } from "../mylib/constant";
import categoryApi from "../api/apiUtils/categoryApi";
import countryApi from "../api/apiUtils/countryApi";
import typeApi from "../api/apiUtils/typeApi";
import filmApi from "../api/apiUtils/filmApi";
import { makeStyles } from "@material-ui/core/styles";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import AddFilm from "../components/admin/AddFilm";
import Dashboard from "../components/admin/Dashboard";
import FilmDetail from "../containers/FilmDetail";
import FilmWatch from "../containers/FilmWatch";
import Footer from "../components/footer/Footer";
import FilmByCategory from "../components/FilmByCategory";
import FilmByCountry from "../components/FilmByCountry";
import FilmByType from "../components/FilmByType";
import Profile from "../components/Profile";
import ChangePass from "../components/ChangePass";
import FilmMarked from "../components/FilmMarked";
import FilmSearch from "../components/FilmSearch";
import UserTable from "../components/admin/UserTable";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
const AppRouter = () => {
  const classes = useStyles();
  const [acc, dispatchAcc] = useReducer(AccReducer, defaultAccount);
  const [navbar, dispatchNavbar] = useReducer(NavBarReducer, defaultNavBar);
  const [home, dispatchHome] = useReducer(HomePageReducer, defaultHomePage);
  const [topView, dispatchTopView] = useReducer(TopViewReducer, defaultTopView);
  const [search, dispatchSearch] = useReducer(SearchReducer, defaultSearch);
  // home reducer
  // loadapi

  useEffect(() => {
    const account = Cookies.getJSON("account");
    //  console.log(account);
    try {
      if (account.token !== undefined) {
        dispatchAcc({ type: ACTION.LOGIN_BY_TOKEN, data: account });
      }
    } catch (error) {
      Cookies.set("account", {
        user_id: null,
        fullname: "",
        email: "",
        token: "",
        role: "",
      });
    }
  }, []);
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        let responseCate = await categoryApi.getAll();
        let responseCountry = await countryApi.getAll();
        let responseType = await typeApi.getAll();
        if (responseCate && responseCountry) {
          let data = {
            category: responseCate,
            country: responseCountry,
            type: responseType,
          };
          dispatchNavbar({ type: ACTION.LOAD_CATE_COUNTRY, data: data });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryList();

    // console.log(home);
  }, []);
  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        let responseHomePage = await filmApi.filmHome();

        if (responseHomePage) {
          dispatchHome({ type: ACTION.LOAD_HOMEPAGE, data: responseHomePage });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHomePage();
  }, []);
  useEffect(() => {
    const fetchTopView = async () => {
      try {
        let responseTopView = await filmApi.getTopView();
        if (responseTopView) {
          dispatchTopView({
            type: ACTION.LOAD_TOP_VIEW,
            data: responseTopView,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopView();
  }, []);
  return (
    <Context.Provider
      value={{
        acc,
        dispatchAcc,
        navbar,
        dispatchNavbar,
        home,
        dispatchHome,
        topView,
        dispatchTopView,
        search,
        dispatchSearch
      }}
    >
      <BrowserRouter>
        <div className={acc.role === "admin" ? classes.root : null}>
          {acc.role !== "admin" ? <Header /> : <HeaderAdmin />}
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/admin" component={Dashboard} exact={true} />
            <Route path="/admin/addfilm" component={AddFilm} />
            <Route path="/film/:film_id" component={FilmDetail} exact={true} />
            <Route
              path={`/film/:film_id/:episode`}
              component={FilmWatch}
              exact={true}
            />
            <Route
              path={"/category/:category_id/:page"}
              component={FilmByCategory}
            />
            <Route
              path={"/country/:country_id/:page"}
              component={FilmByCountry}
            />
            <Route path={"/type/:handle/:page"} component={FilmByType} />
            <Route path={"/user/profile"} component={Profile} exact={true} />
            <Route path={"/user/pass"} component={ChangePass} exact={true} />
            <Route path={"/marked/:page"} component={FilmMarked} />
            <Route path={"/search/:content"} component={FilmSearch}/>
            <Route path={"/admin/usermanager"} component={UserTable}/>
            <Route component={NotFound} />
          </Switch>
          {acc.role !== "admin" && <Footer />}
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default AppRouter;
