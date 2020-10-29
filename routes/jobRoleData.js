const express = require("express");
// const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const JobRoleData = require("../models/JobRoleData");
const router = express.Router();
const {retrieveSalaryData} =require('./helpers')
const app = express();

router.get("/", (req, res) => {
  res.send("On the job role data page");
});

router.get("/:role", async (req, res) => {
  role = req.params.role;
  role = role.toLowerCase();
  let url = "https://www.indeed.com/career/" + role + "/salaries";

  //First check if airport is already in the database
  JobRoleData.countDocuments({ jobRole: role }, async (err, count) => {
    if (count === 1) {
      //If count is 1, it is in database. Return the matching document.
      try {
        const dbResult = await JobRoleData.find({
          jobRole: role,
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
            ).catch(error=>{
                console.error(error);

    })
          }).catch(()=>{
            console.log("failure")
            res.send({
              status: "failure"
            })
          })
          

    }
})
  })

module.exports = router;
