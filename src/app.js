const functions = require("firebase-functions");
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
/**
 * * Settings
 */
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
/* DB config */
const db = require("./config/keys").mongoURI;
/* DB connected */
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/**
 * * Middlewares
 */
app.use(morgan("dev"));
/**
 * * Routes
 */
app.use("/", require("./routes/home.routes"));
app.use("/api/auth", require("./routes/api/users.routes"));
/**
 * * Start server
 */
app.listen(PORT, () => {
  console.log(`Server run on PORT ${PORT}`);
});
//module.exports.handler = serverless(app);
exports.app = functions.https.onRequest(app);
