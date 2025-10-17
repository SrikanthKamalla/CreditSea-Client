import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadAPI } from "../services/api";

// Async thunks
export const uploadXMLFile = createAsyncThunk(
  "upload/uploadXML",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("xmlFile", file);

      const response = await uploadAPI.uploadXML(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkUploadStatus = createAsyncThunk(
  "upload/checkStatus",
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await uploadAPI.getUploadStatus(reportId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    currentUpload: null,
    uploadProgress: 0,
    isUploading: false,
    uploadStatus: "idle", // 'idle' | 'uploading' | 'processing' | 'success' | 'error'
    error: null,
  },
  reducers: {
    clearUpload: (state) => {
      state.currentUpload = null;
      state.uploadProgress = 0;
      state.isUploading = false;
      state.uploadStatus = "idle";
      state.error = null;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetUploadState: (state) => {
      state.currentUpload = null;
      state.uploadProgress = 0;
      state.isUploading = false;
      state.uploadStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload XML
      .addCase(uploadXMLFile.pending, (state) => {
        state.isUploading = true;
        state.uploadStatus = "uploading";
        state.uploadProgress = 0;
        state.error = null;
      })
      .addCase(uploadXMLFile.fulfilled, (state, action) => {
        state.isUploading = false;
        state.uploadStatus = "processing";
        state.currentUpload = action.payload;
        state.uploadProgress = 100;
        state.error = null;
      })
      .addCase(uploadXMLFile.rejected, (state, action) => {
        state.isUploading = false;
        state.uploadStatus = "error";
        state.error = action.payload;
        state.uploadProgress = 0;
      })
      // Check Upload Status
      .addCase(checkUploadStatus.fulfilled, (state, action) => {
        const { status, error } = action.payload;
        state.uploadStatus = status;
        if (status === "processed") {
          state.uploadStatus = "success";
        } else if (status === "failed") {
          state.uploadStatus = "error";
          state.error = error;
        }
      });
  },
});

export const { clearUpload, setUploadProgress, resetUploadState } =
  uploadSlice.actions;
export default uploadSlice.reducer;
