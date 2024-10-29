import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, MesssageResponse, NewOrderRequest, OrderDetailsResponse, UpdateOrderRequest } from "../../types/api-types";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/` }),
    tagTypes: ["Order"],
    endpoints: (builder) => ({
        newOrder: builder.mutation<MesssageResponse, NewOrderRequest>({
            query: (order) => ({
                url: "new",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["Order"],
        }),
        updateOrder: builder.mutation<MesssageResponse, UpdateOrderRequest>({
            query: ({userId, orderId}) => ({
                url: `${orderId}?id=${userId}`,
                method: "PUT",
            }),
            invalidatesTags: ["Order"],
        }),
        deleteOrder: builder.mutation<MesssageResponse, UpdateOrderRequest>({
            query: ({userId, orderId}) => ({
                url: `${orderId}?id=${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Order"],
        }),
        myOrders: builder.query<AllOrdersResponse, string>({
            query: (id) =>`my-orders?id=${id}`,
            providesTags: ["Order"],
        }),
        allOrders: builder.query<AllOrdersResponse, string>({
            query: (id) =>`all-orders?id=${id}`,
            providesTags: ["Order"],
        }),
        orderDetails: builder.query<OrderDetailsResponse, string>({
            query: (id) => id,
            providesTags: ["Order"],
        }),

    }),
});

export const { useNewOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation, useMyOrdersQuery, useAllOrdersQuery, useOrderDetailsQuery } = orderApi;