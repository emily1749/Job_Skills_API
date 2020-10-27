const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const router = express.Router();
const JobRoleData = require("../models/JobRoleData")

const app = express();

router.get("/", (req, res) => {
  res.send("On the Job Role Data page");
});

router.get("/:role" , async (req,res)=>{
    console.log("here1")
    role=req.params.role;
    role=role.toLowerCase();
    let url = "https://www.indeed.com/career/" + role + "/salaries"
    
    // JobRoleData.countDocuments({jobRole: role}), async (err, count) => {
    //     if (count===1){
    //         console.log("here")
    //         try{
    //         const dbResult = await JobRoleData.find({
    //             jobRole: role
    //         });
    //         res.send(dbResult);
    //         return;
    //         } catch (error) {
    //         res.send(error.message)
    //     }
    // } else {
        // console.log("here2")

        //not in database already
        // let url =
        // "https://www.indeed.com/jobs?q=" + skill + "&l=" + city + "%2C+" + state;
  
      async function fetchHTML(url) {
        const { data } = await axios.get(url);
        return cheerio.load(data);
      }
      const $ = await fetchHTML(url);
 let salaryNumber = $(".sal-agg-nonbase__average-salary-value") //salary
let salaryBase= $('.sal-agg-nonbase__average-salary-type')
let salary = salaryNumber.text()+ " " + salaryBase.text();
console.log(salary);
// let array = [];
// let benefits = $(".checked-list__list.common-benefits__list")
let percentSatisfied = $(".salary-satisfaction__text");
percentSatisfied = percentSatisfied.text()
percentSatisfied = percentSatisfied.match(/.{1,}%/)
console.log(percentSatisfied[0])
// let cities = $('.ranked-list.top-paying-cities-list')
let array = [];
let benefits = $('ul.checked-list__list.common-benefits__list li div')
benefits=benefits.text();

// .each(function(element){
    // var item=$(element).find('div')
    // var item = $div.find('div').text()
    // array.push(element.text())
// })
let arrayBenefits = [];
console.log(benefits);
// while(benefits) {
    let element = benefits.match(/^.*?[a-z]{2,}[A-Z0-9]/)[0];
    element = element.slice(0,element.length-1);
    console.log(element);
    arrayBenefits.push(element);
    benefits=benefits.slice(element.length,);
    console.log(arrayBenefits);
    console.log(benefits);



    element = benefits.match(/^.*?[a-z]{2,}[A-Z0-9]/)[0];
    element = element.slice(0,element.length-1);
    console.log(element);
    arrayBenefits.push(element);
    benefits=benefits.slice(element.length,);
    console.log(arrayBenefits);
    console.log(benefits);
// }
// console.log(arrayBenefits);
// console.log(benefits);
// console.log(benefits.text());
// let cities = $('ol.ranked-list__list').each(function(element){
    // var $div = $(element).find('div.ranked-list__item-title-text')
    // item = $div.text();
    // array.push(element)
// })
// console.log(array)
// let cities=$(".ranked-list__item-title-text")
// console.log("CITIES: " + cities.text())
// .each((element)=>{
//     array.push(element)
// });
// benefits.each((element)=>{
//     array.push(element.text())
// })
// console.log(benefits.text())

        const newRole = await new JobRoleData({
            jobRole: role,
            averageBaseSalary: "1200k",
            highestPayingCity: "SF",
                        commonBenefits: "food",
            commonBenefits: "401k",
            commonBenefits: "Health",
            commonBenefits: "GYM",
            commonBenefits: "WLBalance",
        });

        const saved = newRole
        .save()
        .then( doc => {
                res.json(doc);
            }
        ).catch(error=>{
            console.error(error);
        })
    // }
    // console.log("updated")
    // }
})


module.exports = router;