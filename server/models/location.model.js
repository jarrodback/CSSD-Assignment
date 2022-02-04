module.exports = mongoose => {
 const locationSchema = mongoose.Schema(
   {
    name: {
     type: "String",
     required: [true, "A location name is required"]
    },
    coordinates: {
      longitude: {
       type: "Number",
       required: [true, "A longitude is required"]
      },
      latitude: {
       type: "Number",
       required: [true, "A latitude is required"]
      }
    }
   }
 )
 
 return mongoose.model("location", locationSchema)
}