
const db = require("../database/dbConnector");
const sendEmail = require("../database/emailConnector");
const SQL_MAIL = require("../database/SQLqueries/SQLEmail");


const sendOwnerEmail = (req, res) => {
   
    pet_id = req.body.pet_id;
    db.query(SQL_MAIL.GET_USER_EMAIL, [
        pet_id
    ], (error, results) => {
        if (error) {
            console.log(error);
            res.status(404).send({
                err: error.code
            });
        }
        if (results.length > 0) {
            sendEmail(results);
        }
    });
        
    
    
}

module.exports = {
    sendOwnerEmail,
};