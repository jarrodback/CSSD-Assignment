import axios from "axios";

const api = class Api {
    constructor() {
        this.baseUrl =
            process.env.NODE_ENV === "production"
                ? "https://cssd-highway.herokuapp.com/"
                : "http://localhost:3000";
        this.authUrl =
            process.env.NODE_ENV === "production"
                ? "https://cssd-highway.herokuapp.com/auth"
                : "http://localhost:3000/auth";
    }

    async getAllBills(queryString) {
        const query = {
            driver: queryString.driver,
            paid: queryString.paid,
            limit: queryString.limit,
            offset: queryString.offset,
        };

        return axios
            .get(`${this.baseUrl}/bill/`, {
                params: JSON.parse(JSON.stringify(query)),
                withCredentials: true,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    async getBillById(billId) {
        return axios
            .get(`${this.baseUrl}/bill/${billId}`, {
                withCredentials: true,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    async payBill(billId) {
        return axios
            .put(
                `${this.baseUrl}/bill/${billId}`,
                { body: { paid: true } },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    async login(payload) {
        return axios
            .post(`${this.authUrl}/login`, payload, {
                withCredentials: true,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    async register(payload) {
        return axios
            .post(`${this.authUrl}/register`, payload, {
                withCredentials: true,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    async logout() {
        return axios.post(`${this.authUrl}/logout`, {
            withCredentials: true,
        });
    }
};

export default new api();
