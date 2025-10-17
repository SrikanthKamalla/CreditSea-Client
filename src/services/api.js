import { axiosBaseInstance } from "../axios/instance";
import { removeAuthToken } from "../helpers/localstorage";

// Generic API request function using Axios
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await axiosBaseInstance({
      url: endpoint,
      ...options,
    });

    return response.data;
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401) {
        removeAuthToken();
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }

      if (status === 404) {
        throw new Error(data.message || "Resource not found");
      }

      if (status === 500) {
        throw new Error(data.message || "Server error occurred");
      }

      // Handle validation errors or other client errors
      if (status >= 400 && status < 500) {
        throw new Error(data.message || "Request failed");
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Network error: Unable to connect to server");
    } else {
      // Something else happened
      throw new Error(error.message || "Something went wrong");
    }

    throw error;
  }
};

// Auth API calls
const authAPI = {
  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      data: userData,
    }),

  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      data: credentials,
    }),

  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

  getProfile: () => apiRequest("/auth/profile"),

  updateProfile: (profileData) =>
    apiRequest("/auth/profile", {
      method: "PUT",
      data: profileData,
    }),
};

// Upload API calls
const uploadAPI = {
  uploadXML: (formData) =>
    apiRequest("/upload/xml", {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getUploadStatus: (reportId) => apiRequest(`/upload/status/${reportId}`),
};

// Reports API calls
const reportsAPI = {
  getAllReports: (page = 1, limit = 10) =>
    apiRequest(`/reports?page=${page}&limit=${limit}`),

  getReport: (reportId) => apiRequest(`/reports/${reportId}`),

  deleteReport: (reportId) =>
    apiRequest(`/reports/${reportId}`, {
      method: "DELETE",
    }),

  getBasicDetails: (reportId) =>
    apiRequest(`/reports/${reportId}/basic-details`),

  getReportSummary: (reportId) => apiRequest(`/reports/${reportId}/summary`),

  getCreditAccounts: (reportId) =>
    apiRequest(`/reports/${reportId}/credit-accounts`),

  searchReports: (query, page = 1, limit = 10) =>
    apiRequest(
      `/reports/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    ),
};

// System API calls
const systemAPI = {
  healthCheck: () => apiRequest("/health"),
};

// Export all API modules
export { authAPI, uploadAPI, reportsAPI, systemAPI, apiRequest as default };
