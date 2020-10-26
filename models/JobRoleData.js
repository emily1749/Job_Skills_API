const mongoose = require("mongoose");

const JobRoleDataSchema= mongoose.Schema({
    jobRole: {
        type: String,
        required: true
    },
    averageBaseSalary: String,
    percentSalarySatisfaction: String,
    commonBenefits: String,
    commonBenefits: String,
    commonBenefits: String,
    commonBenefits: String,
    commonBenefits: String,
})

module.exports=mongoose.model("JobRoleData", JobRoleDataSchema)