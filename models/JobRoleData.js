const mongoose = require("mongoose");

const JobRoleDataSchema= mongoose.Schema({
    jobRole: {
        type: String,
        required: true
    },
    averageBaseSalary: String,
    percentSalarySatisfaction: String,
    benefits: String,
    benefits: String,
    benefits: String,
    benefits: String,
    benefits: String,
})

module.exports=mongoose.model("JobRoleData", JobRoleDataSchema)