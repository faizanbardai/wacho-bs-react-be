const express = require("express");
const app = express();
const wines = require("./src/wines");

require("dotenv").config();
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Server is up and running!"));
app.use("/wines", wines);
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
