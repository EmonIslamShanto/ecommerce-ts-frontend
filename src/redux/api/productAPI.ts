import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest, MesssageResponse, NewProductRequest, ProductsResponse, searchProductsRequest, searchProductsResponse, UpdateProductRequest } from "../../types/api-types";

export const productAPI = createApi({
    tagTypes: ["Product"],
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/product/` }),
    endpoints: (builder) => ({
        latestProducts: builder.query<AllProductsResponse, string>({
            query: () => "latest",
            providesTags: ["Product"]
        }),

        allProducts: builder.query<AllProductsResponse, string>({ query: (id) => `admin-products?id=${id}`, providesTags: ["Product"]}),
        

        findCategories: builder.query<CategoriesResponse, string>({ query: () => "categories", providesTags: ["Product"] }),

        productsBySearch: builder.query<searchProductsResponse, searchProductsRequest>({
            query: ({ price, search, sort, category, page }) => {
                let url = `search?search=${search}&page=${page}`;
                if (price) {
                    url += `&price=${price}`;
                }
                if (category) {
                    url += `&category=${category}`;
                }
                if (sort) {
                    url += `&sort=${sort}`;
                }
                return url;
            },
            providesTags: ["Product"]
        }),

        productDetails: builder.query<ProductsResponse, string>({ query: (id) => id }),

        createNewProduct: builder.mutation<MesssageResponse, NewProductRequest>({
            query: ({ formdata, id }) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formdata
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation<MesssageResponse, UpdateProductRequest>({
            query: ({ formdata, userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: "PUT",
                body: formdata
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct: builder.mutation<MesssageResponse, DeleteProductRequest>({
            query: ({ userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"]
        }),
    }),
})


export const { useLatestProductsQuery, useAllProductsQuery, useFindCategoriesQuery, useProductsBySearchQuery, useCreateNewProductMutation, useProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation, } = productAPI;
