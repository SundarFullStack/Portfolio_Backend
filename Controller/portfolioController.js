const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

//transporter
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
     api_key:process.env.SECRET_KEY
   }
 })
)

const sendEmailController = (req, res) => {

  try {

    const { name, email, msg } = req.body;
    //validation

    if (!name || !email || !msg) { 
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    //Email Content
    transporter.sendEmail({
      to: "meenakshisunder183017@gmail.com",
      from: "meenakshisunder183017@gmail.com",
      subject: "Regarding Mern Portfolio Application",
      html: `
      <h5>Detail Information</h5>
      <ul>
      <li>Name: ${name}</li>
      <li>Email:${email}</li>
      <li>Message:${msg}</li>
      </ul>
      `
    })
    return res.status(200).send({
      success: true,
      message: "Email Send Successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      Error: error,
    });
  }
};

module.exports = { sendEmailController };
