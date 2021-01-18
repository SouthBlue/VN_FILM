import Sequelize from "sequelize";
import { sequelize, Op } from "../database/database.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userGet = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.user_id } });
    if (user) {
      const date = user.birthday.split("-");
      return res.status(200).json({
        fullname: user.fullname,
        birthday: date[2] + "/" + date[1] + "/" + date[0],
        sex: user.sex === "m" ? "Nam" : "Nữ",
      });
    } else {
      res.status(404).json({
        message: "User's not exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};

const userLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.hashpass, (err, result) => {
          if (err || !result) {
            res.status(401).json({
              message: "Auth failed",
            });
          } else {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.user_id,
                role: user.role,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "24h",
              }
            );
            return res.status(200).json({
              user_id: user.user_id,
              fullname: user.fullname,
              email: user.email,
              token: token,
              role: user.role,
              // user : {avatar, usename, }
              // modify : ->
            });
          }
        });
      } else {
        res.status(401).json({
          message: "Auth failed",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
const userSignup = async (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    // stupid
    //   add(1,3).then(res => if(res % 2== 0){
    //     add(res, 1).then(res2 => if(res2 % 2== 0) {

    //     })
    //   } )
    // try {
    //   add(1, 3)
    //   .then(res => return res % 2 == 0 ? res : res + 1 return new Erro(sai so))
    //   .then(res => return res % 2 == 1 ? res -1 : res + 1 return new ERR)
    //   .then()
    // } catch (error) {

    // }

    .then((user) => {
      if (user != null) {
        return res.status(409).json({
          message: "Email exists",
        });
      } else {
        // return user).then()
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const { fullname, email, birthday, sex } = req.body;
            User.create(
              {
                fullname,
                email,
                hashpass: hash,
                birthday,
                sex,
                role: "client",
              },
              {
                fields: [
                  "fullname",
                  "email",
                  "hashpass",
                  "birthday",
                  "sex",
                  "role",
                ],
              }
            )
              .then((result) => {
                return res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
const userGetAll = async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: ["user_id", "fullname", "email", "birthday", "sex", "role"],
      order: [["user_id", "ASC"]],
    });
    if (user) {
      const list_user = user.map((user) => {
        const date = user.birthday.split("-");
        return {
          user_id: user.user_id,
          fullname: user.fullname,
          email: user.email,
          birthday: date[2] + "/" + date[1] + "/" + date[0],
          sex: user.sex === "m" ? "Nam" : "Nữ",
          role: user.role
        };
      });
      return res.status(200).json({
        list_user: list_user,
      });
    } else {
      return res.status(404).json({
        message: "User's not exist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: err,
    });
  }
};
const userDelete = (req, res, next) => {
  User.destroy({ where: { user_id: req.params.userId } })
    .then((result) => {
      if (result > 0) {
        res.status(200).json({
          message: "User deleted",
          result: result,
        });
      } else {
        res.status(409).json({
          message: "not valid",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const userUpdateInfo = (req, res, next) => {
  const updateOps = {};
  const alowEditProps = ["fullname", "birthday", "sex"];
  for (const ops of req.body) {
    if (alowEditProps.includes(ops.prop)) {
      updateOps[ops.prop] = ops.value;
    }
  }
  User.update(updateOps, { where: { user_id: req.params.userId } })
    .then((result) => {
      if (result > 0) {
        res.status(200).json({
          message: "User updated",
          result: result,
        });
      } else {
        res.status(409).json({
          message: "not valid",
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const userUpdatePassword = (req, res, next) => {
  User.findOne({ where: { user_id: req.params.user_id } }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.hashpass, (err, result) => {
        if (err || !result) {
          res.status(401).json({
            message: "Auth failed",
          });
        } else {
          bcrypt.hash(req.body.newpass, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              User.update(
                { hashpass: hash },
                { where: { user_id: req.params.user_id } }
              )
                .then((result) => {
                  return res.status(200).json({
                    message: "update password successfully",
                  });
                })
                .catch((err) => {
                  return res.status(500).json({
                    message: "update password failed",
                  });
                });
            }
          });
        }
      });
    } else {
      return res.status(409).json({
        message: "not valid",
      });
    }
  });
};
export {
  userGet,
  userLogin,
  userSignup,
  userGetAll,
  userDelete,
  userUpdateInfo,
  userUpdatePassword,
};
