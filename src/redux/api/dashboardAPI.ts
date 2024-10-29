import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/dashboard/` }),
    endpoints: (builder) => ({
        getStats: builder.query<StatsResponse, string>({
        query: (id) => `stats?id=${id}`,
        keepUnusedDataFor: 0,
        }),
        getPie: builder.query<PieResponse, string>({
        query: (id) => `pie?id=${id}`,
        keepUnusedDataFor: 0,
        }),
        getBar: builder.query<BarResponse, string>({
        query: (id) => `bar?id=${id}`,
        keepUnusedDataFor: 0,
        }),
        getLine: builder.query<LineResponse, string>({
        query: (id) => `line?id=${id}`,
        keepUnusedDataFor: 0,
        }),
    }),
})

export const { useGetStatsQuery, useGetPieQuery, useGetBarQuery, useGetLineQuery } = dashboardApi;