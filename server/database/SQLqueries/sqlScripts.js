
const SQL_USER = {
    GET_USER_DETAILS: "SELECT * FROM users WHERE user_id = ?;",
    USER_REGISTER: "INSERT INTO users(fname, lname, email, password, phonenumber, address, city, state, country, zip_code) VALUES (?,?,?,?,?,?,?,?,?,?);",
};
module.exports = SQL_USER;

