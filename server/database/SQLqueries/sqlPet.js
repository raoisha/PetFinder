const SQL_PET = {
   LOST_PET_INFO:"INSERT INTO lostpetdetails(user_id,pet_name, breed, gender, color,last_seen_date, last_seen_time, loc_latitude,loc_longitude, photo) VALUES (?,?,?,?,?,?,?,?,?,?);",
    DISPLAY_LOST_PET:"SELECT * from lostpetdetails;",
    DISPLAY_FOUND_PET:"SELECT * from foundpetdetails;",
    READ_LOST_PET:"SELECT * from lostpetdetails where pet_id=?",
    READ_FOUND_PET:"SELECT * from foundpetdetails where pet_id=?",
    FOUND_PET_INFO:"INSERT INTO foundpetdetails(pet_name,pet_description,last_seen_date, last_seen_time, loc_latitude,loc_longitude, photo) VALUES (?,?,?,?,?,?,?);",

};

module.exports = SQL_PET;


   