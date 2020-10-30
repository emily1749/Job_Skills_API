const express = require("express");
// const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const OccupationData = require("../models/OccupationData");
const router = express.Router();
const {retrieveSalaryData} =require('./helpers/occupationHelpers')
const app = express();

router.get("/", (req, res) => {
  res.send("On the occupation data page");
});

router.get("/:role", async (req, res) => {
  role = req.params.role;
  role = role.toLowerCase();
  let url = "https://www.indeed.com/career/" + role + "/salaries";

  OccupationData.countDocuments({ occupation: role }, async (err, count) => {
    //check if already in database
    if (count === 1) {
      try {
        const dbResult = await OccupationData.find({
          occupation: role,
        });
        res.send(dbResult);
        return;
      } catch (error) {
        console.log(error.message);
      }
    } else {
        async function fetchHTML(url) {
            const { data } = await axios.get(url);
            return cheerio.load(data);
          }
          const $ = await fetchHTML(url).then(async($)=>{
           const newRole = await retrieveSalaryData($);
    
          const saved = newRole.save()
            .then( doc => {
                    res.json(doc);
                }
            ).catch(()=>{
              res.send({message: "failure"})
                // console.error(error);
    })
          }).catch(()=>{
            res.send({
              message: "No data available for input occupation"
            })
          })
    }
})
  })

module.exports = router;
