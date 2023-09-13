const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');

// dotenv configure

dotenv.config();

//rest obj

const app = express();

//middlewares

app.use(cors());
app.use(express.json());

//Static file access

app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/portfolio", require("./Routes/portfolioRoute"));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
//port

const PORT = process.env.PORT || 8000;

//listen

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
