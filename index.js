const express = require("express");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
require("dotenv").config();
const mongooseConnection = require("./src/db/mongoose");
const port = process.env.PORT;
const productRoute = require("./src/route/product");
const listEndpoints = require("express-list-endpoints");

mongooseConnection();

app.get("/", (req, res) => res.send("Server is up and running!"));

app.use(bodyParser.json());

var whitelist = ["http://localhost:3000", "https://faizanbardai.github.io"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use("/products", cors(corsOptions), productRoute);

console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
