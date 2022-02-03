import axios from 'axios'

const api = class Api {
 constructor() {
  this.baseUrl = 'http://localhost:3000'
 }
 
 async getAllBills(queryString) {
  const query = {
   driver: queryString.driver,
   paid: queryString.paid,
   limit: queryString.limit,
   offset: queryString.offset
  }
  
  return axios.get(`${this.baseUrl}/bill/`, { params: JSON.parse(JSON.stringify(query)) } )
    .then(response => {return response.data})
    .catch(error => {throw error})
 }

 async payBill(billId) {
  return axios.put(`${this.baseUrl}/bill/${billId}`, { body: { paid: true }})
    .then(response => {return response.data})
    .catch(error => {throw error})
 }
}

export default new api