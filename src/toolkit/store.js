import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uploadReducer from "./uploadSlice";
import reportsReducer from "./reportsSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
    reports: reportsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;
