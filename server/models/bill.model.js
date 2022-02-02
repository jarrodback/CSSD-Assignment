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

 billSchema.pre('save', async function (next) {
  const journey = await mongoose.model('journey').findById(this.journey).populate({ path: 'entryLocation exitLocation' })
  this.cost = Utilities.calculateCost(journey)
  next()
 })
 
 return mongoose.model("bill", billSchema)
}