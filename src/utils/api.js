// src/utils/api.js
import axios from "axios";

// Base URL without /api suffix
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Create axios instance with interceptors
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (data) => api.post("/auth/register", data),
};

// ============================================
// HEADER API
// ============================================
export const headerAPI = {
  get: () => api.get("/header"),
  update: (formData) => 
    api.put("/header", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// ============================================
// HERO API
// ============================================
export const heroAPI = {
  get: () => api.get("/hero"),
  update: (formData) => 
    api.put("/hero", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// ============================================
// ABOUT HOME API (Home page about section)
// ============================================
export const aboutHomeAPI = {
  get: () => api.get("/about-home"),
  update: (formData) => 
    api.put("/about-home", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// ============================================
// ABOUT PAGE API (Full about page)
// ============================================
export const aboutPageAPI = {
  get: () => api.get("/about-page"),
  update: (formData) => 
    api.put("/about-page", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// ============================================
// PRODUCTS API
// ============================================
export const productsAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  getBySlug: (slug) => api.get(`/products/${slug}`),
  create: (formData) => 
    api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) => 
    api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/products/${id}`),
};

// ============================================
// GALLERY API
// ============================================
export const galleryAPI = {
  getAll: () => api.get("/gallery"),
  getFeatured: () => api.get("/gallery/featured"),
  create: (formData) => 
    api.post("/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  toggleFeatured: (id) => api.patch(`/gallery/${id}/toggle-featured`),
  delete: (id) => api.delete(`/gallery/${id}`),
};

// ============================================
// CONTACT API
// ============================================
export const contactAPI = {
  get: () => api.get("/contact"),
  update: (data) => api.put("/contact", data),
};

// ============================================
// FOOTER API
// ============================================
export const footerAPI = {
  get: () => api.get("/footer"),
  update: (data) => api.put("/footer", data),
};

// ============================================
// ADMIN/STATS API (optional)
// ============================================
export const adminAPI = {
  getStats: () => api.get("/admin/stats"),
};

// Export default api instance for custom calls
export default api;


// ============================================
// BRANDS API
// ============================================
export const brandsAPI = {
  getAll: () => api.get("/brands"),
  getBySlug: (slug) => api.get(`/brands/${slug}`),
  create: (formData) => 
    api.post("/brands", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) => 
    api.put(`/brands/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/brands/${id}`),
};