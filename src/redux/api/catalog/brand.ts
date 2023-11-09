import { useGetEmployeeMutation } from "redux/api/employeeApi";
import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase from "redux/api/customFetchBase";

interface Brand {
  brandId?: string;
  name: string;
  description: string;
  image: string;
}

const brandApi = createApi({
  reducerPath: "brand",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: "/catalogs/brands/all",
        method: "GET",
      }),
    }),
    getBrands: builder.query({
      query: () => ({
        url: "/catalogs/brands",
        method: "GET",
      }),
    }),
    addBrand: builder.mutation({
      query: (data: Brand) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", data.name);
        bodyFormData.append("Description", data.description);
        bodyFormData.append("Image", data.image);

        return {
          url: "/catalogs/brands",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          body: { bodyFormData },
          formData: true,
        };
      },
    }),
    getBrand: builder.query({
      query: (brandId: string) => ({
        url: `/catalogs/brands/${brandId}`,
        method: "GET",
      }),
    }),
    updateBrand: builder.mutation({
      query: (data: Brand) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", data.name);
        bodyFormData.append("Description", data.description);
        bodyFormData.append("Image", data.image);

        return {
          url: `/catalogs/brands/${data.brandId}`,
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          body: { bodyFormData },
          formData: true,
        };
      },
    }),
    deleteBrand: builder.query({
      query: (brandId: string) => ({
        url: `/catalogs/brands/${brandId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useAddBrandMutation,
  useDeleteBrandQuery,
  useGetAllBrandsQuery,
  useGetBrandQuery,
  useGetBrandsQuery,
  useUpdateBrandMutation,
} = brandApi;

export default brandApi;
