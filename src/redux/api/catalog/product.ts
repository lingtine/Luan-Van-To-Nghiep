import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "redux/api/customFetchBase";

import { IProductType } from "../types";

const productApi = createApi({
  reducerPath: "product",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/catalogs/products",
        method: "GET",
      }),
      transformResponse: (response: { data: IProductType[] }) => {
        return response.data;
      },
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
          url: "/catalogs/categories",
          method: "POST",
          body: bodyFormData,
        };
      },
    }),
    getProductDetail: builder.query({
      query: (productId: string) => ({
        url: `/catalogs/products/details/${productId}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }: IProductType) => {
        return {
          url: `/catalogs/products/${id}`,
          method: "PUT",
          body: rest,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/catalogs/products/${productId}`,
        method: "DELETE",
      }),
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
