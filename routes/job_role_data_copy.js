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
    
    // JobRoleData.findOne({jobRole: role}), async (err, count) => {
    //     if (docs.length){
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

  
        

  
      async function fetchHTML(url) {
        const { data } = await axios.get(url);
        return cheerio.load(data);
      }
      const $ = await fetchHTML(url);
 let salaryNumber = $(".sal-agg-nonbase__average-salary-value") //salary
let salaryBase= $('.sal-agg-nonbase__average-salary-type')
let salary = salaryNumber.text()+ " " + salaryBase.text();
console.log(salary);

let percentSatisfied = $(".salary-satisfaction__text");
percentSatisfied = percentSatisfied.text()
percentSatisfied = percentSatisfied.match(/.{1,}%/)
console.log(percentSatisfied[0])

let array = [];
let benefits = $('ul.checked-list__list.common-benefits__list li div')
benefits=benefits.text();

let arrayBenefits = [];
// console.log(benefits);



while(arrayBenefits.length<4){
   let element = benefits.match(/^.*?[a-z]{2,}[A-Z0-9]/)[0];
    element = element.slice(0,element.length-1);
    arrayBenefits.push(element);
    benefits=benefits.slice(element.length,);
}
arrayBenefits.push(benefits);
console.log(arrayBenefits);
    


        const newRole = await new JobRoleData({
            jobRole: role,
            averageBaseSalary: salary,
           percentSatisfied: percentSatisfied[0],
             benefits1: arrayBenefits[0],
           benefits2: arrayBenefits[1],
            benefits3: arrayBenefits[2],
            benefits4: arrayBenefits[3],
            benefits5: arrayBenefits[4],
        });

        const saved = newRole
        .save()
        .then( doc => {
                res.json(doc);
            }
        ).catch(error=>{
            console.error(error);
        // })
    // }
    // console.log("updated")
    // }
})
})


module.exports = router;
// while(benefits) {
    // let element = benefits.match(/^.*?[a-z]{2,}[A-Z0-9]/)[0];
    // element = element.slice(0,element.length-1);
    // console.log(element);
    // arrayBenefits.push(element);
    // benefits=benefits.slice(element.length,);
    // console.log(arrayBenefits);
    // console.log(benefits);
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