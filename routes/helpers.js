exports.retrieveSalaryData=async function($){
    let salaryNumber = $(".sal-agg-nonbase__average-salary-value") //salary
let salaryBase= $('.sal-agg-nonbase__average-salary-type')
let salary = salaryNumber.text()+ " " + salaryBase.text();


let percentSatisfied = $(".salary-satisfaction__text");
percentSatisfied = percentSatisfied.text()
percentSatisfied = percentSatisfied.match(/.{1,}%/)
// console.log(percentSatisfied[0])

let array = [];
let benefits = $('ul.checked-list__list.common-benefits__list li div')
benefits=benefits.text();

let arrayBenefits = [];
// console.log(benefits);

// console.log(benefits);

while(arrayBenefits.length<4){
   let element = benefits.match(/^.*?[a-z]{2,}[A-Z0-9]/)[0];
    element = element.slice(0,element.length-1);
    arrayBenefits.push(element);
    benefits=benefits.slice(element.length,);
}
arrayBenefits.push(benefits);
// console.log(arrayBenefits);
return [salary, percentSatisfied, arrayBenefits]
}


