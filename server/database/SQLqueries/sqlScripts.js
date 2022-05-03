
const SQL_USER = {
    GET_USER_DETAILS: "SELECT * FROM users WHERE email = ?;",
    USER_REGISTER: "INSERT INTO users(fname, lname, email, password, phonenumber, address, city, state, country, zipcode) VALUES (?,?,?,?,?,?,?,?,?,?);",
};
module.exports = SQL_USER;

