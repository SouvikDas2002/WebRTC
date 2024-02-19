import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials:true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// list of all the endpoints
export const sendOtp=(data)=>api.post("/api/sendOtp",data);
export const verifyOtp=(data)=>api.post("/api/verifyOtp",data);
export const activate=(data)=>api.post("/api/activate",data);

export default api;