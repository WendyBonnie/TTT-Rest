/**
 ** ** App
 */

/* Imports */
const express = require("express");
const logger = require("morgan");
const path = require("path");

/* App creation */
let app = express();

/* Middlewares */
app.use(logger("dev"));

/* Serve static files */
app.use(express.static(path.join(__dirname, "public")));

/* Handle routes for react router */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

module.exports = app;
