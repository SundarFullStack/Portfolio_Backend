const router = require("express").Router();
const portfolioDb = require("../Models/Viewers");
const nodemailer = require("nodemailer");

// console.log("Email", process.env.EMAIL);
// console.log("Password", process.env.PASSWORD);


//For Viewers Addition

router.post("/sendEmail", async (req, res) => {
  const { fname, email, message } = req.body;
  //   console.log(fname, email, message);
  if (!fname || !email || !message) {
    res.status(422).json({
      success: false,
      message: "Fill All the details properly in body ",
    });
  }

  try {

    //Validating Existing User or Not and Save their Credentials
    const preuser = await portfolioDb.findOne({ email: email });

    if (preuser) {
      res.status(422).json({
        success: false,
        message: "This Email Already Exist!!",
      });
    } else {
      const finalViewer = new portfolioDb({
        fname,
        email,
        message,
      });

      const storeData = await finalViewer.save();

      // console.log(storeData);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      var mailOptions = {
        from: process.env.EMAIL,
        to: "sundermeenakshi15055@gmail.com",
        subject: "Sending Email using Node.js",
        text: `Viewer Name: ${fname}, Email: ${email},Message:${message}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(422).json({
            Error: error,
            success: false,
            message: "Error in sending Email",
          });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({
            success: true,
            message: "Email Send Successfully!!!",
          });
        }
      });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
});

module.exports = router;
