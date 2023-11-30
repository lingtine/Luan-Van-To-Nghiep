import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetDiscountEventsQuery,
  useRemoveDiscountEventMutation,
} from "redux/api/discount/discount-event";

interface DiscountEventProps {}

const DiscountEvent: React.FC<DiscountEventProps> = () => {
  const { index } = useParams();
  const { data, isSuccess, isLoading } = useGetDiscountEventsQuery({
    pageIndex: index,
  });
  const [removeDiscountEvent, { isSuccess: removeSuccess }] =
    useRemoveDiscountEventMutation();

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên sự kiện",
      render: (data: any) => {
        return data.name;
      },
    },

    {
      label: "Miêu tả sự kiện",
      render: (data: any) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: any) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => {
                removeDiscountEvent(data.id);
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
    const updateData = data.data.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
    content = (
      <>
        <Table config={configData} data={updateData}></Table>
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={0}
            pageSize={20}
            totalCount={80}
            url="/admin/discountEvents"
          />
        </div>
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
        <Link to="/admin/discountEvents/add-discountEvent">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm Sự Kiện
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default DiscountEvent;
