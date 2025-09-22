// services/http.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.example.com", // ✅ change to your API base
  timeout: 10_000,
});

// Optional: add interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error logging
    console.error("API error:", error?.response?.status, error?.message);
    return Promise.reject(error);
  }
);
