import React, { useState } from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
} from "redux/api/catalog/brand";
import { useParams } from "react-router-dom";

import { IBrand } from "redux/api/types";
import {
  ConfirmDialog,
  IContentConfirm,
} from "components/confirm-dialog/confirm-dialog";

interface IBrandTable extends IBrand {
  index: number;
}

const Brand = () => {
  const { index } = useParams();
  const [productRemove, setProductRemove] = useState<IContentConfirm>();

  const handleToggle = (data?: IContentConfirm) => {
    if (data) {
      setProductRemove(() => {
        return {
          id: data.id,
          title: data.title,
          content: data.content,
        };
      });
    } else {
      setProductRemove(undefined);
    }
  };

  const { data, isSuccess, isLoading } = useGetBrandsQuery({
    pageIndex: index,
  });
  const [removeBrand, { isSuccess: removeSuccess }] = useDeleteBrandMutation();
  const configData = [
    {
      label: "STT",
      render: (data: IBrandTable) => {
        return data.index;
      },
    },
    {
      label: "Tên Thương Hiệu",
      render: (data: IBrandTable) => {
        return (
          <div className="flex items-center gap-4">
            <img className="w-28" src={data.imageUrl} alt={data.name} />
          </div>
        );
      },
    },

    {
      label: "Miêu tả",
      render: (data: IBrandTable) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: IBrandTable) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => {
                handleToggle({
                  id: data.id,
                  title: `Bạn có muốn xóa thương hiệu ${data.name}`,
                  content:
                    "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                });
              }}
              color="red"
            >
              Xoá
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Xoá thành công");
    }
  }, [removeSuccess]);
  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex } = data;
    const updateData: IBrandTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));

    content = (
      <>
        <Table config={configData} data={updateData}></Table>;
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url={"/admin/brand"}
          />
        </div>
        ;
      </>
    );
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="px-4 ">
      <div className="flex justify-end my-4">
        <Link to="/admin/brand/add-brand">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm Thương hiệu
          </Button>
        </Link>
      </div>
      {content}
      <ConfirmDialog
        data={productRemove}
        setData={handleToggle}
        handleConfirm={() => {
          if (productRemove) {
            removeBrand(productRemove.id);
            setProductRemove(undefined);
          }
        }}
      />
    </div>
  );
};

export default Brand;
