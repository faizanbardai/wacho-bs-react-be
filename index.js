const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
var mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    serverSelectionTimeoutMS: 5000
  })
  .then(
    () => {
      console.log("Connected!");
    },
    err => {
      console.log(err);
    }
  );

app.get("/", (req, res) => res.send("Server is up and running!"));
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
