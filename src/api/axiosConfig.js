// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default api;



// import axios from "axios";
// const api = "http://localhost:5000"; 

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default axios.create({
//   baseURL: API_BASE_URL ,
// });
// api.interceptors.request.use(config => {
//    const token = localStorage.getItem("token");
//    if (token) config.headers.Authorization = `Bearer ${token}`;
//    return config;
// })





import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach interceptor to axios instance
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
