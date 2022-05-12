const SQL_MAIL = {
     GET_USER_EMAIL: "SELECT email,fname, lname from users \
                      inner join lostpetdetails on users.user_id=lostpetdetails.user_id \
                      where pet_id=?"
 };
 
 
 module.exports = SQL_MAIL;
 
 
    