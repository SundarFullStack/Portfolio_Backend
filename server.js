const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// dotenv configure

dotenv.config();

//rest obj

const app = express();

//middlewares

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/portfolio", require("./Routes/portfolioRoute"));
//port

const PORT = process.env.PORT || 8000;

//listen

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
