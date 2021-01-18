import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import fileupload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();
import indexRouter from "./src/routes/index.js";
import usersRouter from "./src/routes/users.js";
import cateRouter from "./src/routes/categories.js";
import filmRouter from "./src/routes/films.js";
import countryRouter from "./src/routes/countries.js";
import typeRouter from "./src/routes/typemovie.js";
import episodeRouter from "./src/routes/episodes.js";
import markedRouter from "./src/routes/marked.js";
import adminRouter from "./src/routes/admin.js";
const app = express();
const __dirname = path.resolve();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileupload());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/category", cateRouter);
app.use("/film", filmRouter);
app.use("/country", countryRouter);
app.use("/type", typeRouter);
app.use("/episode", episodeRouter);
app.use("/marker", markedRouter);
app.use("/admin", adminRouter);

app.use("/files/", express.static("./storage", { maxAge: 31557600 }));
app.use("/videos/", express.static("./storage/video", { maxAge: 31557600 }));
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error("Invalid request");
  error.status = 404;
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
