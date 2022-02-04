const haversine = require("haversine")
const httpError = require("http-errors")
const objectId = require("mongoose").Types.ObjectId

module.exports = class Utilities {
 static calculateCost(journey) {
  return (haversine(journey.entryLocation.coordinates, journey.exitLocation.coordinates) * this.costPerMile)
 }

 static convertToObjectId(id) {
  if (objectId.isValid(id)) {
   return objectId(id)
  }
  throw new httpError(400, "ID is not valid.")
 }
 
 static costPerMile = 0.01
}