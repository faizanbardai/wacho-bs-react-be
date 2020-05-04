const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongooseConnection = require("./src/db/mongoose");
const port = process.env.PORT;
const productRoute = require("./src/route/product");
const multiLingualContent = require("./src/route/multiLingualContent");
const purchasesRoute = require("./src/route/purchase");
const adminRoute = require("./src/route/admin");
const listEndpoints = require("express-list-endpoints");

mongooseConnection();
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

app.use(bodyParser.json());

app.use(passport.initialize());

var whitelist = [
  "http://localhost:3003",
  "https://faizanbardai.github.io",
  "goldenesvliesmmm.de",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use("/products", cors(corsOptions), productRoute);
app.use("/multiLingualContent", cors(), multiLingualContent);
app.use("/purchases", cors(corsOptions), purchasesRoute);
app.use("/admin", cors(corsOptions), adminRoute);

console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
