﻿module.exports = mongoose => {
 const billSchema = mongoose.Schema(
   {
    journey: { 
     type: mongoose.Schema.Types.ObjectId, 
     ref: "journey",
     required: [true, "A journey must be attached to a bill."],
     unique: true
    },
    driver: { 
     type: String,
     required: [true, "A driver must be assigned to a bill."]
    },
    cost: {
     type: Number,
     required: [true, "A cost for the bill is required."]
    },
    paid: {
     type: Boolean,
     default: false
    }
   }
 )

 return mongoose.model("bill", billSchema)
}