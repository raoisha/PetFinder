const SQL_PET = {
   LOST_PET_INFO:"INSERT INTO lostpetdetails(user_id,pet_name, breed, gender, color,last_seen_date, last_seen_time, loc_latitude,loc_longitude, photo) VALUES (?,?,?,?,?,?,?,?,?,?);",
    DISPLAY_LOST_PET:"SELECT * from lostpetdetails order by last_seen_Date desc;",
    DISPLAY_FOUND_PET:"SELECT * from foundpetdetails order by last_seen_Date desc;",
    READ_LOST_PET:"SELECT lostpetdetails.pet_name,lostpetdetails.breed,lostpetdetails.color,lostpetdetails.gender,lostpetdetails.last_seen_date ,lostpetdetails.last_seen_time ,lostpetdetails.loc_latitude,lostpetdetails.loc_longitude, lostpetdetails.photo ,users.fname, users.lname, \
    users.phonenumber from lostpetdetails,users where users.user_id=lostpetdetails.user_id \
    and lostpetdetails.pet_id=?",
    READ_FOUND_PET:"SELECT foundpetdetails.pet_name,foundpetdetails.pet_description,foundpetdetails.last_seen_date ,foundpetdetails.last_seen_time ,foundpetdetails.loc_latitude,foundpetdetails.loc_longitude, foundpetdetails.photo ,users.fname, users.lname, \
    users.phonenumber from foundpetdetails,users where users.user_id=foundpetdetails.user_id \
    and foundpetdetails.pet_id=?",
    FOUND_PET_INFO:"INSERT INTO foundpetdetails(user_id,pet_name,pet_description,last_seen_date, last_seen_time, loc_latitude,loc_longitude, photo) VALUES (?,?,?,?,?,?,?,?);",

};

module.exports = SQL_PET;


   