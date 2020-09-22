const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const router = express.Router();

const app = express();

router.get("/", (req, res) => {
  res.send("On the Job Data page");
});

router.get("/:zipCode", async (req, res) => {
  var skillsArray = [
    // "C",
    "C%23", //C#
    "C%2B%2B", //C++
    "golang",
    "java",
    "javascript",
    "php",
    "python",
    "ruby",
    "swift",
    "typescript",
  ];
  let resultList = [];
  let item = "";
  let zipCode = req.params.zipCode;
  let resultObj = {};
  //   let skill = "python";

  skillsArray
    .forEach(async skill => {
      let url = "https://www.indeed.com/jobs?q=" + skill + "&l=" + zipCode;

      async function fetchHTML(fetchUrl) {
        const { data } = await axios.get(fetchUrl);
        return cheerio.load(data);
      }
      const $ = await fetchHTML(url);
      //   console.log(`Site HTML: ${${"#searchCountPages"}}`);

      skillsArray.forEach(skill => {});
      $('div[id="searchCountPages"]')
        // .find("div > div > a")
        .each(function(index, element) {
          item = $(element).text();
          console.log(item);
          item = item.match(/of.{1,}job/);
          item = item[0].replace(",", "").match(/\d{1,}/);
        });
      console.log(item[0]);
      resultList.push(parseInt(item[0]));
      console.log(resultList);
      resultObj[skill] = parseInt(item[0]);

      console.log(resultObj);
    })
    .then(result => {
      console.log(result);
      res.json(resultObj);
    });

  //   res.json(resultObj);
});
module.exports = router;
