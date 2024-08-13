const express = require("express");
const app = express();
const fs = require("fs");
const ytdl = require("ytdl-core");
const path = require("path");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.post("/download", (req, res) => {
  const videoURL = req.body.videoLink;
  console.log(videoURL);

  ytdl(videoURL)
    .pipe(fs.createWriteStream("video.mp4"))
    .on("finish", () => {
      console.log("Download completed!");
    });
  res.redirect("/");
});

app.listen(3000);
