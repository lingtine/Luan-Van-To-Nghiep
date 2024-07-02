import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "redux/api/customFetchBase";

import {
  IProductDetail,
  IProductInput,
  IProductPage,
  IProductParams,
  IProductSpecification,
  IProductReport,
} from "share/types/product";

import { IFilterProductParameter } from "../types";
import { IDateReport, IProductSpecificationInput } from "share/types/product";

const productApi = createApi({
  reducerPath: "product",
  baseQuery: customFetchBase,
  tagTypes: [
    "product",
    "add-product",
    "remove-product",
    "update-product",
    "add-specifications",
    "update-specifications",
    "remove-specifications",
    "filter-products",
  ],
  endpoints: (builder) => ({
    getProductCarousel: builder.query<IProductDetail[], void>({
      query: () => ({
        url: "/catalogs/products",
        method: "GET",
        params: {
          PageSize: 4,
          IsInStock: true,
          OrderBy: "Price",
          IsOrderDesc: true,
        },
      }),
      transformResponse: ({ data }) => data,
    }),
    getProducts: builder.query<IProductPage, IProductParams>({
      query: (params) => ({
        url: "/catalogs/products",
        method: "GET",
        params,
      }),

      providesTags: (result) =>
        result
          ? result.data.map(({ id }) => ({ type: "product", id }))
          : [
              "add-product",
              "remove-product",
              "update-product",
              "add-specifications",
              "remove-specifications",
              "update-specifications",
            ],
    }),
    getProductsByParams: builder.mutation<IProductDetail[], IProductParams>({
      query: (params) => ({
        url: "/catalogs/products/",
        method: "GET",
        params,
      }),
      transformResponse: ({ data }) => data,
    }),
    addProduct: builder.mutation<IProductDetail, IProductInput>({
      query: (data) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", data.name);
        bodyFormData.append("Description", data.description);
        bodyFormData.append("Image", data.image);
        bodyFormData.append("UnitPrice", data.unitPrice.toString());
        bodyFormData.append("CategoryId", data.categoryId);
        bodyFormData.append("Sku", data.sku);
        bodyFormData.append("BrandId", data.brandId);
        if (data.relatedImages) {
          Array.from(data.relatedImages).forEach((file, index) => {
            bodyFormData.append(`RelatedImages`, file);
          });
        }

        if (data.specifications) {
          bodyFormData.append(
            `SpecificationsJson`,
            JSON.stringify(data.specifications)
          );
        }

        return {
          url: "/catalogs/products",
          method: "POST",
          body: bodyFormData,
        };
      },
      transformResponse: ({ data }) => data,
      invalidatesTags: ["add-product"],
    }),
    getProductHome: builder.query<IProductDetail[], IProductParams>({
      query: (params) => ({
        url: "/catalogs/products/home",
        method: "GET",
        params: params,
      }),
      transformResponse: ({ data }) => data,
      providesTags: ["add-product", "remove-product", "update-product"],
    }),
    getProductDetail: builder.query<IProductDetail, string>({
      query: (productId) => ({
        url: `/catalogs/products/details/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "product", id }],
      transformResponse: ({ data }) => data,
    }),
    updateProduct: builder.mutation<IProductDetail, IProductInput>({
      query: (data) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", data.name);
        bodyFormData.append("Description", data.description);
        if (data.image) bodyFormData.append("Image", data.image);
        bodyFormData.append("UnitPrice", data.unitPrice.toString());
        if (data.relatedImages) {
          Array.from(data.relatedImages).forEach((file, index) => {
            bodyFormData.append(`RelatedImages`, file);
          });
        }

        if (data.specifications) {
          bodyFormData.append(
            `SpecificationsJson`,
            JSON.stringify(data.specifications)
          );
        }
        return {
          url: `/catalogs/products/${data.id}`,
          method: "PUT",
          body: bodyFormData,
        };
      },
      invalidatesTags: ["update-product"],
    }),
    deleteProduct: builder.mutation<boolean, string>({
      query: (productId) => ({
        url: `/catalogs/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove-product"],
      transformResponse: ({ data }) => data,
    }),
    addSpecificationForProduct: builder.mutation<
      any,
      { productId: string; data: IProductSpecificationInput[] }
    >({
      query: ({ productId, data }) => ({
        url: `/catalogs/products/${productId}/add-specifications`,
        body: data,
        method: "POST",
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "product", id: arg.productId },
      ],
    }),
    removeSpecificationForProduct: builder.mutation<
      any,
      { productId: string; data: string[] }
    >({
      query: ({ productId, data }) => ({
        url: `/catalogs/products/${productId}/remove-specifications`,
        body: data,
        method: "POST",
      }),

      invalidatesTags: ["remove-specifications"],
    }),
    updateSpecificationForProduct: builder.mutation<
      IProductSpecification,
      IProductSpecification
    >({
      query: (data) => ({
        url: `/catalogs/products/${data.productId}/upload-specifications`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["update-product"],
    }),
    getProductReport: builder.mutation<any, IDateReport>({
      query: (data) => ({
        url: "/catalogs/products/GetProductReport",
        body: data,
        method: "POST",
      }),
    }),
    productRevenuePeriodicReporting: builder.mutation<
      any,
      { date: string; periodic: string }
    >({
      query: (data) => ({
        url: "/catalogs/products/ProductRevenuePeriodicReporting",
        body: data,
        method: "POST",
      }),
    }),
    productRevenueByIdReporting: builder.mutation<
      any,
      { start: string; end: string; productId: string }
    >({
      query: (data) => ({
        url: "/catalogs/products/ProductRevenueByIdReporting",
        body: data,
        method: "POST",
      }),
    }),
    productRevenueReporting: builder.mutation<IProductReport[], IDateReport>({
      query: (data: { start: string; end: string }) => ({
        url: "/catalogs/products/ProductRevenueReporting",
        body: data,
        method: "POST",
      }),

      transformResponse: ({ data }) => data.data,
    }),
    exportProductReportFile: builder.mutation<any, IDateReport>({
      query: (data) => ({
        url: "/catalogs/products/ExportProductReportFile",
        body: data,
        method: "POST",
      }),
    }),
    exportProductReport: builder.mutation<any, IDateReport>({
      query: (data) => ({
        url: "/catalogs/products/ExportProductReport",
        body: data,
        method: "POST",
      }),
    }),

    filterProductByParameter: builder.mutation({
      query: (parameters: IFilterProductParameter) => ({
        url: "/catalogs/products/GetProductByParams",
        body: parameters,
        method: "POST",
      }),
      transformResponse: (response: {
        data: IProductDetail[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      }) => {
        return response;
      },
      invalidatesTags: ["filter-products"],
    }),
  }),
});
export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductHomeQuery,
  useGetProductDetailQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddSpecificationForProductMutation,
  useRemoveSpecificationForProductMutation,
  useUpdateSpecificationForProductMutation,
  useGetProductCarouselQuery,
  useGetProductsByParamsMutation,
  useExportProductReportFileMutation,
  useExportProductReportMutation,
  useGetProductReportMutation,
  useProductRevenueByIdReportingMutation,
  useProductRevenuePeriodicReportingMutation,
  useProductRevenueReportingMutation,
  useFilterProductByParameterMutation,
} = productApi;

export default productApi;
