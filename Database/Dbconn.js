const mongoose = require("mongoose");
// const DATABASE = "mongodb+srv://meenakshisunder183017:DMLab1%40pacr.org@sundar.qhyhwwt.mongodb.net/Portfolio"

const DATABASE = process.env.DATABASE;

// console.log("Database", DATABASE);

mongoose
  .connect(DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase Connected"))
  .catch((errr) => {
    console.log(errr);
  });
