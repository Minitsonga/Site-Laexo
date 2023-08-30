require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const routes = require("./src/routes/routes.js");
const axios = require("axios").default;
const http = require("http").Server(app);

const bodyParser = require("body-parser");
const session = require("express-session");
const crypto = require("crypto");

const name = "braitsch";
let hash = crypto.createHash("sha512").update(name).digest("hex");

// Configure body-parser to parse incoming request bodies
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.use(
  session({
    secret: hash,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
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
