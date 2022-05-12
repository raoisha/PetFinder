const db = require("../database/dbConnector");
const SQL_PET = require("../database/SQLqueries/sqlPet");


const lostPetInfo = (req, res) => {

    user_id= req.body.userid;
    const {
        pet_name,
        breed,
        gender,
        color,
        last_seen_date,
        last_seen_time,
        latitude,
        longitude,
        pet_photo,
    } = req.body.lostPetDetails;
    
    db.query(
        SQL_PET.LOST_PET_INFO,
        [
            user_id,
            pet_name,
            breed,
            gender,
            color,
            last_seen_date,
            last_seen_time,
            latitude,
            longitude,
            pet_photo,
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
            })
    });
}

const displayLostPetInfo = (req, res) => {

  db.query(SQL_PET.DISPLAY_LOST_PET, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results);
  });
}

const readLostPetDetail = (req, res) => {
  let pet_id = req.params.id;
  db.query(SQL_PET.READ_LOST_PET,[pet_id], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results[0]);
  });
}


const foundPetInfo = (req, res) => {
  const {
      pet_name,
      pet_description,
      last_seen_date,
      last_seen_time,
      latitude,
      longitude,
      pet_photo,
  } = req.body.foundPetDetails;
  
  db.query(
      SQL_PET.FOUND_PET_INFO,
      [
          pet_name,
          pet_description,
          last_seen_date,
          last_seen_time,
          latitude,
          longitude,
          pet_photo,
       ],
       (err, result) => {
          if (err) {
            res.status(404).send({
               err: "pet details exists" 
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

          })
          res.send(result);
  });
}


const displayFoundPetList = (req, res) => {

  db.query(SQL_PET.DISPLAY_FOUND_PET, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results);
  });
}

const displayFoundPetDetails = (req, res) => {
  let pet_id = req.params.id;
  db.query(SQL_PET.READ_FOUND_PET,[pet_id], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results[0]);
  });
}


module.exports = {
    lostPetInfo,
    displayLostPetInfo,
    readLostPetDetail,
    foundPetInfo,
    displayFoundPetList,
    displayFoundPetDetails,
  };