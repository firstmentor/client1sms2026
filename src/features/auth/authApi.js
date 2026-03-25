import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["User"], // 🔥 important

  baseQuery: fetchBaseQuery({
    baseUrl: "https://sms-api-2026-1.onrender.com/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], // 🔥 login ke baad profile refresh
    }),

    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["User"], // 🔥 cache identify
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"], // 🔥 logout ke baad profile clear
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;