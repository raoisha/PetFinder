
const SQL_USER = {
    GET_USER_DETAILS: "SELECT * FROM users WHERE email = ?;",
    USER_REGISTER: "INSERT INTO users(fname, lname, email, password, phonenumber, address, city, state, country, zipcode) VALUES (?,?,?,?,?,?,?,?,?,?);",
    LOST_PET_INFO:"INSERT INTO lostpetdetails(pet_name, breed, gender, color, last_seen_date, last_seen_time, last_seen_location, photo) VALUES (?,?,?,?,?,?,?,?);",
};

module.exports = SQL_USER;



