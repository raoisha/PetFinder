var nodemailer = require("nodemailer");

const sendEmail = (results) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "petfinderapp01@gmail.com", // create admin gmail & add it here
          pass: "lostpetfinder01@", // password 
        },
      });
      

      var mailOptionsList = [];

      results.forEach((element) => {
        mailOptionsList.push(
          {
            from: "petfinderapp01@gmail.com", // admin gmail id
            to: element.email,
            subject: "Your Pet has been located",
            text: "Hi " + element.fname + "\nYour pet has been found. " + "Please go to the App to see the location details " + "\nThank you!",
          }
        );
      });

      mailOptionsList.forEach((element) => {
        transporter.sendMail(element, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      })
      
      
};

// provide access using this link https://myaccount.google.com/lesssecureapps  for admin gmail account

module.exports = sendEmail;

// import sendEmail in your js & 
// call using sendEmail("to address", "sub" , "content")