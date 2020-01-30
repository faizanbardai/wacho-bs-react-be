const express = require("express");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
require("dotenv").config();
const mongooseConnection = require("./src/db/mongoose");
const port = process.env.PORT;
const productRoute = require("./src/route/product");
const multiLingualContent = require("./src/route/multiLingualContent");
const listEndpoints = require("express-list-endpoints");

mongooseConnection();

app.get("/", (req, res) => res.send("Server is up and running!"));

app.use(bodyParser.json());

var whitelist = [
  "http://localhost:3000",
  "http://localhost:3000/en",
  "http://localhost:3000/de",
  // "https://faizanbardai.github.io",
  // "https://faizanbardai.github.io/en",
  // "https://faizanbardai.github.io/de",
  "https://faizanbardai.github.io/wacho-bs-react/"
];
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
app.use("/multiLingualContent", cors(), multiLingualContent);

console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
