const express = require("express");
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

app.use("/products", productRoute);

console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
