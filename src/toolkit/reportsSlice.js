import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reportsAPI } from "../services/api";

// Async thunks
export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await reportsAPI.getAllReports(page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReport = createAsyncThunk(
  "reports/fetchReport",
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await reportsAPI.getReport(reportId);
      return response.data.report;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (reportId, { rejectWithValue }) => {
    try {
      await reportsAPI.deleteReport(reportId);
      return reportId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchReports = createAsyncThunk(
  "reports/searchReports",
  async ({ query, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await reportsAPI.searchReports(query, page, limit);
      return { ...response.data, searchTerm: query };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    currentReport: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
    searchResults: [],
    searchTerm: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchTerm = "";
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentReport: (state, action) => {
      state.currentReport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reports
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reports = action.payload.reports;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Single Report
      .addCase(fetchReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentReport = action.payload;
        state.error = null;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentReport = null;
      })
      // Delete Report
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report._id !== action.payload
        );
        state.searchResults = state.searchResults.filter(
          (report) => report._id !== action.payload
        );
        if (state.currentReport && state.currentReport._id === action.payload) {
          state.currentReport = null;
        }
      })
      // Search Reports
      .addCase(searchReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.reports;
        state.searchTerm = action.payload.searchTerm;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(searchReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentReport, clearSearch, clearError, setCurrentReport } =
  reportsSlice.actions;
export default reportsSlice.reducer;
