const express = require("express");
const app = express();
require("dotenv").config();
var mongoose = require("mongoose");

const wines = require("./src/routes/wines");

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
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
app.use("/wines", wines);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
