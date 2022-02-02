const Utilities = require("../utilities")
module.exports = mongoose => {
 const billSchema = mongoose.Schema(
   {
    journey: { 
     type: mongoose.Schema.Types.ObjectId, 
     ref: "journey",
     required: [true, "A journey must be attached to a bill."],
     unique: true
    },
    driver: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "user",
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

 billSchema.pre('insertMany', async function (next, docs) {
  for(const index in docs){
   const bill = docs[index]
   const journey = await mongoose.model('journey').findById(bill.journey).populate({path: 'entryLocation exitLocation'})
   bill.cost = Utilities.calculateCost(journey)
   await mongoose.model('bill').findByIdAndUpdate(bill._id, bill)
  }
  next()
 })
 
 return mongoose.model("bill", billSchema)
}