const haversine = require('haversine-distance')

module.exports = mongoose => {
 const journeySchema = mongoose.Schema(
   {
    regNumber: {
     type: "String",
     required: [true, "A car registration number is required"]
    },
    entryLocation: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "location"
    },
    exitLocation: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "location"
    },
    journeyDateTime: {
     type: Date
    }
   }
 )
 
 journeySchema.methods.getJourneyDistance = function() {
  return haversine(this.entryLocation.coordinates, this.exitLocation.coordinates)
 }
 
 return mongoose.model("journey", journeySchema)
}