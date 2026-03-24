import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { classApi } from "../features/class/classApi";
import { subjectApi } from "../features/subject/subjectApi"; // ✅ ADD THIS
import { studentApi } from "../features/student/studentApi";
import { resultApi } from "../features/result/resultApi";



export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer, // ✅ ADD THIS
    [studentApi.reducerPath]: studentApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,


    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      classApi.middleware,
      subjectApi.middleware, // ✅ ADD THIS
      studentApi.middleware,
      resultApi.middleware
    )
});