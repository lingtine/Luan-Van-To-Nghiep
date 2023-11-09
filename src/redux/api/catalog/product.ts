import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "redux/api/customFetchBase";

interface ProductType {
  productId?: string;
  name: string;
  description: string;
  unitPrice: number;
  image: string;
  categoryId: string;
  brandId: string;
}

const productApi = createApi({
  reducerPath: "product",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/catalogs/products",
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (data: ProductType) => {
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
          body: data,
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
      query: ({ productId, ...rest }: ProductType) => {
        return {
          url: `/catalogs/products/${productId}`,
          method: "PUT",
          body: rest,
        };
      },
    }),
    deleteProduct: builder.query({
      query: (productId: string) => ({
        url: `/catalogs/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useAddProductMutation,
  useDeleteProductQuery,
  useGetProductDetailQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} = productApi;

export default productApi;
