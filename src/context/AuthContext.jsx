

// import axios from "axios";

// // Base URL without /api suffix
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// // Create axios instance with interceptors
// const api = axios.create({
//   baseURL: `${API_BASE_URL}/api`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor - Add token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - Handle common errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// // API methods
// export const authAPI = {
//   login: (credentials) => api.post("/auth/login", credentials),
//   register: (data) => api.post("/auth/register", data),
// };

// export const headerAPI = {
//   get: () => api.get("/header"),
//   update: (formData) => api.put("/header", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }),
// };

// export const heroAPI = {
//   get: () => api.get("/hero"),
//   update: (formData) => api.put("/hero", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }),
// };

// export const aboutHomeAPI = {
//   get: () => api.get("/about-home"),
//   update: (formData) => api.put("/about-home", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }),
// };

// export const aboutPageAPI = {
//   get: () => api.get("/about-page"),
//   update: (formData) => api.put("/about-page", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }),
// };

// export const productsAPI = {
//   getAll: () => api.get("/products"),
//   getBySlug: (slug) => api.get(`/products/${slug}`),
//   create: (formData) => api.post("/products", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }),
//   update: (id, formData) => api.put(`/products/${id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }),
//   delete: (id) => api.delete(`/products/${id}`),
// };

// export const galleryAPI = {
//   get: () => api.get("/gallery"),
//   update: (formData) => api.put("/gallery", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }),
// };

// export const contactAPI = {
//   get: () => api.get("/contact"),
//   update: (data) => api.put("/contact", data),
// };

// export const footerAPI = {
//   get: () => api.get("/footer"),
//   update: (data) => api.put("/footer", data),
// };

// export default api;























// src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if token exists on mount
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//       // Optionally verify token with backend here
//     }
//     setLoading(false);
//   }, []);

//   const login = (newToken, userData = null) => {
//     localStorage.setItem("token", newToken);
//     setToken(newToken);
//     if (userData) {
//       setUser(userData);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     setUser(null);
//   };

//   const isAuthenticated = () => {
//     return !!token;
//   };

//   return (
//     <AuthContext.Provider 
//       value={{ 
//         token, 
//         user,
//         login, 
//         logout, 
//         isAuthenticated, 
//         loading 
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };



// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// IMPORTANT FIX: export AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load stored token
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (newToken, userData = null) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (userData) setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
