const express = require("express");
const bodyParser = require("body-parser");
const jobDataRoute = require("./routes/jobData");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/jobData", jobDataRoute);

PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening to port ${PORT}`));
