const express = require("express");
const { sendEmailController } = require("../Controller/portfolioController");

//Router Object

const router = express.Router();

//Routes

router.post("/sendEmail", sendEmailController);

module.exports= router;
