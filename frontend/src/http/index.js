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
export const logout=()=>api.post("/api/logout")
export const createRoom=(data)=>api.post("/api/rooms",data);
export const getAllRooms=()=>api.get('/api/rooms');
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);

// Interceptors

api.interceptors.response.use((config)=>{
  return config;
},
async (error)=>{
  const originalReqest=error.config;
  if(error.response.status===401 && originalReqest && !originalReqest.isRetry){
    originalReqest.isRetry=true;
    try{
      await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{withCredentials:true});
      return api.request(originalReqest);
    }catch(err){
      console.log(err);
    }
  }
  throw error;
});

export default api;