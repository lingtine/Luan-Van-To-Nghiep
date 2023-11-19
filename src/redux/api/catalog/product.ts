import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "redux/api/customFetchBase";

import { IProductDetailType, IProductType } from "../types";

const productApi = createApi({
  reducerPath: "product",
  baseQuery: customFetchBase,
  tagTypes: ["add-product", "remove-product", "update-product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/catalogs/products",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: { data: IProductType[] }) => {
        return response.data;
      },
      providesTags: ["add-product", "remove-product", "update-product"],
    }),
    addProduct: builder.mutation({
      query: (data: IProductType) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", data.name);
        bodyFormData.append("Description", data.description);
        bodyFormData.append("Image", data.image);
        bodyFormData.append("UnitPrice", data.unitPrice.toString());
        bodyFormData.append("CategoryId", data.categoryId);
        bodyFormData.append("BrandId", data.brandId);
        return {
          url: "/catalogs/products",
          method: "POST",
          body: bodyFormData,
        };
      },
      invalidatesTags: ["add-product"],
    }),
    getProductDetail: builder.query({
      query: (productId: string) => ({
        url: `/catalogs/products/details/${productId}`,
        method: "GET",
      }),
      providesTags: ["add-product", "remove-product", "update-product"],

      transformResponse: (response: { data: IProductDetailType }) =>
        response.data,
    }),
    updateProduct: builder.mutation({
      query: ({
        id,
        ...rest
      }: {
        id: string;
        name: string;
        description: string;
        unitPrice: number;
      }) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", rest.name);
        bodyFormData.append("Description", rest.description);
        //bodyFormData.append("Image", rest.image);
        bodyFormData.append("UnitPrice", rest.unitPrice.toString());

        return {
          url: `/catalogs/products/${id}`,
          method: "PUT",
          body: bodyFormData,
        };
      },
      invalidatesTags: ["update-product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/catalogs/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove-product"],
    }),
  }),
});
export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductDetailQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} = productApi;

export default productApi;
