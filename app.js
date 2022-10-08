require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./src/routes/routes.js");
const axios = require("axios").default;
const http = require("http").Server(app);

const session = require("express-session");
const crypto = require("crypto");
const name = "braitsch";
var hash = crypto.createHash("md5").update(name).digest("hex");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use(
  session({
    secret: hash,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    rolling: true,
  })
);

app.use("", routes);

app.get("/", (req, res) => {
  res.redirect("/stream");
});

app.post("/revoke", async (req, res) => {
  await axios.post(
    "https://id.twitch.tv/oauth2/revoke",
    new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      token: process.env.GET_TOKEN,
    })
  );
  res.send("Done");
});

app.get("/reseaux", (req, res) => {
  res.render("pages/reseaux");
});

app.get("*", async (req, res) => {
  res.render("pages/error");
});

http.listen(process.env.PORT, "localhost", () =>
  console.log(`Listening at http://localhost:${process.env.PORT}/stream`)
);
