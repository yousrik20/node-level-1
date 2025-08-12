const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/mydataSchema");
app.set("view engine", "ejs");
app.use(express.static('public'))

// Auto Refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});



// Get Request
app.get("/", (req, res) => {
  Mydata.find()
    .then((result) => {
      res.render("home", { mytitle: "Home page" ,arr:result});
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/views/index.html", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});
mongoose
  .connect(
    "mongodb+srv://yousrike13:121995@cluster0.zcpamik.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  // Post Request
app.post("/", (req, res) => {
  console.log(req.body);
  const mydata = new Mydata(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("./views/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
