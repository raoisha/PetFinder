const SQL_PET = {
   // LOST_PET_INFO:"INSERT INTO lostpetdetails(pet_name, breed, gender, color, DATE_FORMAT(last_seen_date,'%Y-%m-%d') as 'last_seen_date', last_seen_time, last_seen_location, photo) VALUES (?,?,?,?,?,?,?,?);",
    LOST_PET_INFO:"INSERT INTO lostpetdetails(pet_name, breed, gender, color,last_seen_date, last_seen_time, loc_latitude,loc_longitude, photo) VALUES (?,?,?,?,?,?,?,?,?);",
    DISPLAY_LOST_PET:"SELECT * from lostpetdetails;",
    READ_LOST_PET:"SELECT * from lostpetdetails where pet_id=?",
    GET_USER_EMAIL: "SELECT emailid,f_name, l_name, event_name from users \
                     inner join lostpetdetails on users.user_id=lostpetdetails.user_id \
                     where pet_id=?"
};


module.exports = SQL_PET;


   