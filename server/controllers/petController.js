const db = require("../database/dbConnector");
const SQL_PET = require("../database/SQLqueries/sqlPet");


const lostPetInfo = (req, res) => {
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

  db.query(SQL_PET.READ_EVENT, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results[0]);
  });
}


module.exports = {
    lostPetInfo,
    displayLostPetInfo,
  };