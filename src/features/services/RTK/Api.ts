import { Product, ProductsPayloadType } from "../../../Types/Products";
import { GenericResponse } from "../../../Types/Responses";
import { LoginPayload } from "../../../interfaces/Payload";
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const CoreApi = createApi({
  reducerPath: "CoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_APP_MY_ENVIRONMENT === "prod"
        ? import.meta.env.VITE_APP_PROD_BASE_URL
        : import.meta.env.VITE_APP_DEV_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "authorization",
        `bearer ${String(localStorage.getItem("token"))}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (id: number) => `/${id}`,
    }),
    getAllCart: builder.query({
      query: (id: any) => ({
        url: `cart/${id}`,
      }),
    }),

    addToCart: builder.mutation({
      query: (args) => ({
        url: `cart/${args?.id}`,
        body: args.payload,
        method: "POST",
      }),
    }),
    removeCartItem: builder.mutation({
      query: (id: number | string) => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
    }),
    CreateUser: builder.mutation({
      query: (args) => ({
        url: "register",
        body: args,
        method: "POST",
        redirect: "follow",
      }),
    }),
    getCurrentUser: builder.query<any, any>({
      query: () => ({
        url: "/me",
      }),
    }),
    LoginUser: builder.mutation<LoginPayload, any>({
      query: (args) => ({
        url: "login",
        body: args,
        method: "POST",
        // redirect: 'follow'
      }),
    }),
    addBillingDetails: builder.mutation({
      query: (args) => ({
        url: `/billing_info/${args.id}`,
        body: args.payload,
        method: "POST",
      }),
    }),
    getBillingDetails: builder.query({
      query: (args) => ({
        url: `/billing_info/${args}`,
      }),
    }),
    getProducts: builder.query<ProductsPayloadType, string>({
      query: (query) => ({
        url: `products${query}`,
      }),
    }),
    getOrderById: builder.query<any, string>({
      query: (query: number | string) => ({
        url: `order/${query}`,
      }),
    }),
    getProductById: builder.query<GenericResponse<Product>, string>({
      query: (id: any) => ({
        url: `/product/${id}`,
      }),
    }),
    createProduct: builder.mutation({
      query: (args) => ({
        url: `/admin/product/new`,
        body: args,
        method: "POST",
      }),
    }),
    paymentProcess: builder.mutation<any, any>({
      query: (args) => ({
        url: `/payment/process`,
        body: args,
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.REACT_APP_STRIPE_API_KEY}`,
        },
        params: args,
      }),
    }),
    createOrder: builder.mutation<any, any>({
      query: (args) => ({
        url: `/order/new`,
        body: args,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // params: args,
      }),
    }),
    removeAllCart: builder.mutation({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
    }),
    getStripeKey: builder.query<any, any>({
      query: (args) => ({
        url: `/stripeapikey`,
        // params: args,
      }),
    }),
    getMyOrders: builder.query<any, any>({
      query: () => ({
        url: "/orders/me",
      }),
    }),
    createReview: builder.mutation<any, any>({
      query: (args) => ({
        url: "/review",
        method: "PUT",
        body: args,
      }),
    }),
    getProductReviews: builder.mutation<any, any>({
      query: (args) => ({
        url: `/reviews?id=${args}`,
        method: "GET",
      }),
    }),
    logout: builder.mutation<any, any>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostsQuery,
  useGetCurrentUserQuery,
  useGetAllCartQuery,
  useCreateUserMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddToCartMutation,
  useRemoveCartItemMutation,
  useLoginUserMutation,
  useCreateProductMutation,
  useLogoutMutation,
  useAddBillingDetailsMutation,
  useGetBillingDetailsQuery,
  usePaymentProcessMutation,
  useCreateOrderMutation,
  useGetStripeKeyQuery,
  useGetMyOrdersQuery,
  useRemoveAllCartMutation,
  useCreateReviewMutation,
  useGetProductReviewsMutation
} = CoreApi;
