require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { connect } = require("mongoose");
require("colors");

connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB".bgGreen))
  .catch((err) => console.log(err, "DB connection error".bgRed));

const router = require("./routers/router");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("welcome to server"));

app.use("/api", router);

app.listen(PORT, () => console.log("http://localhost:".bgCyan + PORT.bgCyan));
