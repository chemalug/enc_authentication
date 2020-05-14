const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");

/**
 * * Settings
 */
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* DB config */
const db = require("./config/keys").mongoURI;
app.set("key", require("./config/keys").secretOrKey);

/* DB connected */
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
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
app.use("/api/auth", require("./routes/api/auth.routes"));
app.use("/api/users", require("./routes/api/users.routes"));
app.use("/api/schools", require("./routes/api/schools.routes"));
/**
 * * Start server
 */
app.listen(PORT, () => {
  console.log(`Server run on PORT ${PORT}`);
});
//module.exports.handler = serverless(app);
