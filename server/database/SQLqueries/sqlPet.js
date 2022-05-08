const SQL_PET = {
   // LOST_PET_INFO:"INSERT INTO lostpetdetails(pet_name, breed, gender, color, DATE_FORMAT(last_seen_date,'%Y-%m-%d') as 'last_seen_date', last_seen_time, last_seen_location, photo) VALUES (?,?,?,?,?,?,?,?);",
    LOST_PET_INFO:"INSERT INTO lostpetdetails(pet_name, breed, gender, color,last_seen_date, last_seen_time, loc_latitude,loc_longitude, photo) VALUES (?,?,?,?,?,?,?,?,?);",
};


module.exports = SQL_PET;


   