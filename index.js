const express = require("express");
const app = express();
require("dotenv").config();
var mongoose = require("mongoose");
const WinesModel = require('./src/schema/wines')
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

const winesRoute = require("./src/routes/wines");

const port = process.env.PORT;

app.get("/", (req, res) => res.send("Server is up and running!"));
app.use("/wines", winesRoute);
app.listen(port, async () => {
  await connectToMongoDB();
  const response = await WinesModel.find();
  console.log(response);
  console.log(`Server is listening on port ${port}!`);
});
