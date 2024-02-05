const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const pool = require("./db")

//import passport middleware

require("./middlewares/passport-middleware");

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//import routes
const authRoutes = require("./routes/auth");

//initialize routes
app.use("/api", authRoutes);

//register and login routes
app.use("/auth", require("./routes/auth"));

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

//Assigning Credit
app.post("/api/credit", async (req, res) => {
  try {
    const { data_balance } = req.body;
    const newBalance = await Pool.query(
      "INSERT INTO data_balance(data_balance) VALUES($1)",
      [data_balance]
    );
    res.json(newBalance);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
});

//uploading PDF
app.post("/users", async (req, res) => {
  try {
    const { data_balance } = req.body;
    const newBalance = await Pool.query(
      "INSERT INTO pdf(pdfs) VALUES($1)",
      [data_balance] 
    );
    res.json(newBalance);
  } catch (error) {
    console.error(err.message);
  }
});
appStart();
