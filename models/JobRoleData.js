const mongoose = require("mongoose");

const JobRoleDataSchema= mongoose.Schema({
    jobRole: {
        type: String,
        required: true
    },
    averageBaseSalary: String,
    percentSatisfied: String,
    benefits1: String,
    benefits2: String,
    benefits3: String,
    benefits4: String,
    benefits5: String,
})

module.exports=mongoose.model("JobRoleData", JobRoleDataSchema)