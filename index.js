const express = require("express");
const app = express();
require("dotenv").config();
var mongoose = require("mongoose");
const connectToMongoDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
      .then(console.log("Connected!"));
  } catch (error) {
    console.log(error);
  }
};

const wines = require("./src/routes/wines");

const port = process.env.PORT;

app.get("/", (req, res) => res.send("Server is up and running!"));
app.use("/wines", wines);
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is listening on port ${port}!`);
});
