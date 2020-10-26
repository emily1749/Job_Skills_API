const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const jobDataRoute = require("./routes/jobData");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.set("view engine", "hbs");

app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
  })
);


app.get("/", (req, res) => {
  res.send("home page");
});
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("main", { layout: "index" });
});


app.use("/jobData", jobDataRoute);

mongoose.connect(
  // process.env.DB_CONNECTION,
  "mongodb+srv://emily123:emily123@cluster0.ldahv.mongodb.net/job_data_API?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database");
  }
);


PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening to port ${PORT}`));
