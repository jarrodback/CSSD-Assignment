const haversine = require("haversine")

module.exports = class Utilities {
 static calculateCost(journey) {
  return (haversine(journey.entryLocation.coordinates, journey.exitLocation.coordinates) * this.costPerMile)
 }
 
 static costPerMile = 0.01
}