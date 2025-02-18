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
const authMiddleware = require("./middleware/authMiddleware");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://gaz-service.vercel.app/"],
    methods: ["POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => res.send("welcome to server"));

app.use("/api", authMiddleware, router);

app.listen(PORT, () => console.log("http://localhost:".bgCyan + PORT.bgCyan));
