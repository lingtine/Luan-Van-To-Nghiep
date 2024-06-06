import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "redux/api/customFetchBase";

import {
  IProductDetailType,
  IProductType,
  IProductReport,
  IAddProductType,
  IProductAddSpecification,
} from "../types";

const productApi = createApi({
  reducerPath: "product",
  baseQuery: customFetchBase,
  tagTypes: [
    "add-product",
    "remove-product",
    "update-product",
    "add-specifications",
    "update-specifications",
    "remove-specifications",
  ],
  endpoints: (builder) => ({
    getProductCarousel: builder.query<IProductDetailType[], void>({
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
      transformResponse: ({ data }) => ({ ...data }),
    }),
    getProducts: builder.query<
      {
        data: IProductDetailType[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
      },
      any
    >({
      query: (params) => ({
        url: "/catalogs/products",
        method: "GET",
        params,
      }),

      providesTags: [
        "add-product",
        "remove-product",
        "update-product",
        "add-specifications",
        "remove-specifications",
        "update-specifications",
      ],
    }),
    getProductsByParams: builder.mutation<IProductDetailType[], any>({
      query: (params) => ({
        url: "/catalogs/products/",
        method: "GET",
        params,
      }),
      transformResponse: ({ data }) => ({ ...data }),
    }),
    addProduct: builder.mutation<any, IAddProductType>({
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
      invalidatesTags: ["add-product"],
    }),
    getProductHome: builder.query<any, any>({
      query: (params) => ({
        url: "/catalogs/products/home",
        method: "GET",
        params: params,
      }),
      transformResponse: ({ data }) => ({ ...data }),
      providesTags: [
        "add-product",
        "remove-product",
        "update-product",
        "add-specifications",
        "remove-specifications",
        "update-specifications",
      ],
    }),
    getProductDetail: builder.query<IProductDetailType, string>({
      query: (productId: string) => ({
        url: `/catalogs/products/details/${productId}`,
        method: "GET",
      }),
      providesTags: [
        "add-product",
        "remove-product",
        "update-product",
        "add-specifications",
        "remove-specifications",
        "update-specifications",
      ],

      transformResponse: ({ data }) => ({ ...data }),
    }),
    updateProduct: builder.mutation({
      query: ({
        id,
        ...rest
      }: {
        id: string;
        name: string;
        description: string;
        image: File;
        unitPrice: number;
        relatedImages?: FileList;
        specifications?: IProductAddSpecification[];
      }) => {
        var bodyFormData = new FormData();
        bodyFormData.append("Name", rest.name);
        bodyFormData.append("Description", rest.description);
        if (rest.image) bodyFormData.append("Image", rest.image);
        bodyFormData.append("UnitPrice", rest.unitPrice.toString());
        if (rest.relatedImages) {
          Array.from(rest.relatedImages).forEach((file, index) => {
            bodyFormData.append(`RelatedImages`, file);
          });
        }

        if (rest.specifications) {
          bodyFormData.append(
            `SpecificationsJson`,
            JSON.stringify(rest.specifications)
          );
        }
        return {
          url: `/catalogs/products/${id}`,
          method: "PUT",
          body: bodyFormData,
        };
      },
      invalidatesTags: ["update-product"],
    }),
    deleteProduct: builder.mutation<string, any>({
      query: (productId) => ({
        url: `/catalogs/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["remove-product"],
    }),
    addSpecificationForProduct: builder.mutation<
      any,
      {
        productId: string;
        data: {
          specificationId: string;
          specificationName: string;
          specificationValue: string;
        }[];
      }
    >({
      query: ({ productId, data }) => ({
        url: `/catalogs/products/${productId}/add-specifications`,
        body: data,
        method: "POST",
      }),

      invalidatesTags: ["add-specifications"],
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
      any,
      {
        productId: string;
        data: {
          specificationId: string;
          specificationName: string;
          specificationValue: string;
        }[];
      }
    >({
      query: ({ productId, data }) => ({
        url: `/catalogs/products/${productId}/upload-specifications`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["update-product"],
    }),
    getProductReport: builder.mutation({
      query: (data: { start: string; end: string }) => ({
        url: "/catalogs/products/GetProductReport",
        body: data,
        method: "POST",
      }),
    }),
    productRevenuePeriodicReporting: builder.mutation({
      query: (data: { date: string; periodic: string }) => ({
        url: "/catalogs/products/ProductRevenuePeriodicReporting",
        body: data,
        method: "POST",
      }),
    }),
    productRevenueByIdReporting: builder.mutation({
      query: (data: { start: string; end: string; productId: string }) => ({
        url: "/catalogs/products/ProductRevenueByIdReporting",
        body: data,
        method: "POST",
      }),
    }),
    productRevenueReporting: builder.mutation({
      query: (data: { start: string; end: string }) => ({
        url: "/catalogs/products/ProductRevenueReporting",
        body: data,
        method: "POST",
      }),

      transformResponse: (response: { data: { data: IProductReport[] } }) =>
        response.data.data,
    }),
    exportProductReportFile: builder.mutation({
      query: (data: { start: string; end: string }) => ({
        url: "/catalogs/products/ExportProductReportFile",
        body: data,
        method: "POST",
      }),
    }),
    exportProductReport: builder.mutation({
      query: (data: { start: string; end: string }) => ({
        url: "/catalogs/products/ExportProductReport",
        body: data,
        method: "POST",
      }),
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
} = productApi;

export default productApi;
