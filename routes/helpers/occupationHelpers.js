const OccupationData = require("../../models/OccupationData");

exports.retrieveSalaryData=async function($){
    let salaryNumber = $(".sal-agg-nonbase__average-salary-value") //salary
let salaryBase= $('.sal-agg-nonbase__average-salary-type')
let salary = salaryNumber.text()+ " " + salaryBase.text();


let percentSatisfied = $(".salary-satisfaction__text");
percentSatisfied = percentSatisfied.text()
percentSatisfied = percentSatisfied.match(/.{1,}%/)


let benefits = $('ul.checked-list__list.common-benefits__list li div')
benefits=benefits.text();

let arrayBenefits = [];

while(arrayBenefits.length<4){
   let element = benefits.match(/^.*?[a-z]{2,}[A-Z0-9]/)[0];
    element = element.slice(0,element.length-1);
    arrayBenefits.push(element);
    benefits=benefits.slice(element.length,);
}
arrayBenefits.push(benefits);

const newRole = await new OccupationData({
    occupation: role,
    averageBaseSalary: salary,
   percentSatisfied: percentSatisfied[0],
    benefits1: arrayBenefits[0],
   benefits2: arrayBenefits[1],
    benefits3: arrayBenefits[2],
    benefits4: arrayBenefits[3],
    benefits5: arrayBenefits[4],
});

return newRole


}