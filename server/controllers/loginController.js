const bcrypt = require("bcrypt");
const db = require("../database/dbConnector");
const SQL_USER = require("../database/SQLqueries/sqlScripts");
const saltRounds = 10;


const getLogin = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

const setLogin = (req, res) => {
    const user_id = req.body.user_id;
    const password = req.body.password;
    if (req.session.user) {
      res.send({ message: "already logged in" });
    } else {
      db.query(SQL_USER.GET_USER_DETAILS, user_id, (err, result) => {
        if (err) {
          sendError(req, res, "sql error: " + err.code);
          return;
        } else if (result.length > 0) {
         
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
                setSession(req, res, user_id);
            } else {
              res
                .status(404)
                .send({ err: "Wrong username/password combination!" });
            }
          });
        } else {
          res.status(404).send({ err: "User doesn't exist" });
        }
      });
    }
  };
  
  const registerUser = (req, res) => {
    const {
      first_name,
      last_name,
      email_id,
      password,
      phonenumber,
      adddress,
      city,
      state,
      country,
      zip_code,
    } = req.body.userDetails;
 
    // Hash password before store in database
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(404).send({ err: err.message });
        return;
      } else {
        db.beginTransaction(function (err) {
          if (err) {
            res.status(404).send({ err: err.code });
            db.rollback();
            return;
          }
          db.query(
            SQL_USER.USER_REGISTER,
            [
              first_name,
              last_name,
              email_id,
              hash,
              phonenumber,
              adddress,
              city,
              state,
              country,
              zip_code,
            ],

            (err, result) => {
              if (err) {
                res.status(404).send({
                   err: "User already exist" 
                });
                db.rollback();
                return;
              } 
            });
          
      });
    }
  });
  };

module.exports = {
    getLogin,
    setLogin,
    registerUser,
  };