module.exports = mongoose => {
 const journeySchema = mongoose.Schema(
   {
    regNumber: {
     type: "String",
     required: [true, "A car registration number is required"]
    },
    entryLocation: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "location",
     required: [true, "A entry location is required."]
    },
    exitLocation: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "location",
     required: [true, "A exit location is required."]
    },
    journeyDateTime: {
     type: Date
    }
   }
 )
 
 return mongoose.model("journey", journeySchema)
}