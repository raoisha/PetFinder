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
  const emailid = req.body.emailid;
  const password = req.body.password;

    if (req.session.user) {
      res.send({ message: "already logged in" });
    } else {
      db.query(SQL_USER.GET_USER_DETAILS, emailid, (err, result) => {
        if (err) {
          res.status(404).send({ err: err.code });
        } 
          else if (result.length > 0) {
         
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = {
                user_id: result[0].user_id,
              };
              res.send({
                user_id: result[0].user_id,
              });
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
      emailid,
      password,
      phonenumber,
      address,
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
              emailid,
              hash,
              phonenumber,
              address,
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
            
              db.commit(function (err) {
                if (err) {
                  res.status(404).send({
                    err: err.code,
                  });
                  db.rollback();
                  return;
                }
              
              const data = {
                emailid: emailid,
              };
              res.send(JSON.stringify(data));
            });
          });
      });
    }
  });
  };
  
  const signout = (req, res) => {
    if (req.session.user) {
      req.session.destroy();
      req.session = null;
      res.send("hello");
    }
  };

  
  
module.exports = {
    getLogin,
    setLogin,
    registerUser,
    signout,
  };