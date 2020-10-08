const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const router = express.Router();

const app = express();

router.get("/", (req, res) => {
  res.send("On the Job Data page");
});

router.get("/:city/:state", async (req, res) => {
  let city = req.params.city;
  // city = city.replace(" ", "+");

  let state = req.params.state;
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
  // let zipCode = req.params.zipCode;
  let resultObj = {};
  //   let skill = "python";
  // async function fetchSkills() {
  skillsArray.forEach(async skill => {
    let url =
      "https://www.indeed.com/jobs?q=" + skill + "&l=" + city + "%2C+" + state;

    async function fetchHTML(fetchUrl) {
      const { data } = await axios.get(fetchUrl);
      return cheerio.load(data);
    }
    const $ = await fetchHTML(url);
    //   console.log(`Site HTML: ${${"#searchCountPages"}}`);

    $('div[id="searchCountPages"]')
      // .find("div > div > a")
      .each(function(index, element) {
        item = $(element).text();
        // console.log(item);
        item = item.match(/of.{1,}job/);
        item = item[0].replace(",", "").match(/\d{1,}/);
      });
    // console.log(item[0]);
    resultList.push(parseInt(item[0]));
    console.log(resultList);
    resultObj[skill] = parseInt(item[0]);
    console.log(resultObj);
    // console.log(resultObj);
    // return resultObj;
    if (Object.keys(resultObj).length == 10) {
      // console.log(resultObj);
      let result = [];
      let flag = false;
      for (const [key, value] of Object.entries(resultObj)) {
        let keyResult = key;
        if (!value) {
          res.send({ message: "Error - data not found" });
          return;
        }
        console.log(key + value);

        if (key === "C%23") {
          result.push(["C#", value]);
        }
        if (key === "typescript") {
          result.push(["TypeScript", value]);
        }
        if (key === "python") {
          result.push(["Python", value]);
        }
        if (key === "golang") {
          result.push(["Golang", value]);
        }
        if (key === "ruby") {
          result.push(["Ruby", value]);
        }
        if (key === "C%2B%2B") {
          result.push(["C++", value]);
        }
        if (key === "php") {
          result.push(["PHP", value]);
        }
        if (key === "swift") {
          result.push(["Swift", value]);
        }
        if (key === "java") {
          result.push(["Java", value]);
        }
        if (key === "javascript") {
          result.push(["JavaScript", value]);
        }
        // if (keyResult === "C%2B%2B") {
        //   keyResult = "C++";
        // }
      }
      let jsonObj = {};
      for (let i = 0; i < 10; i++) {
        jsonObj[result[i][0]] = result[i][1];
      }
      // console.log(result);
      // console.log;

      res.send(jsonObj);

      //send below
      // res.send(resultObj);

      // console.log(Object.keys(resultObj[1]));

      // return resultObj;
    }
    // } else {
    //   res.send("Please enter valid city and state");
    // }
  });
  // .then(result => {
  //   console.log(result);
  //   // res.json(resultObj);
  // })
  // .catch(error => {
  //   console.error(error);
  // });

  // res.send(resultObj);
  // console.log("resultOBj: " + resultObj);
  // return resultObj;
  // }

  // const savedObj = await fetchSkills()
  //   .then(doc => {
  //     console.log("here");
  //     // console.log(doc);
  //     // resc.json(doc);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  // console.log("savedobj:" + savedObj);
  // console.log("fetchskills: " + (await fetchSkills()));
  // // console.log("test");
  // //   res.json(resultObj);
  // res.send(resultObj);
});
module.exports = router;
