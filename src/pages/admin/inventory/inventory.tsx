import React from "react";
import Table from "components/table/table";
import { Button, Spinner } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "components/pagination/pagitnation";
import { Link } from "react-router-dom";

import { useGetProductWarehouseQuery } from "redux/api/warehouse/product";
import { useParams } from "react-router-dom";
interface InventoryProps {}

const Inventory: React.FC<InventoryProps> = () => {
  const { index } = useParams();
  const { data, isSuccess, isLoading } = useGetProductWarehouseQuery({
    pageIndex: index,
    pageSize: 20,
  });
  // const [removeInventory, { isSuccess: removeSuccess }] =
  //   useRemoveInventoryMutation();

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "sku",
      render: (data: any) => {
        return data.sku;
      },
    },
    {
      label: "Tên sản phẩm",
      render: (data: any) => {
        return data.name;
      },
    },
    {
      label: "Số lượng",
      render: (data: any) => {
        return <div className="min-w-[80px]">{data.quantity}</div>;
      },
    },
    {
      label: "Trạng thái",
      render: (data: any) => {
        return (
          <div className="min-w-[160px] flex justify-end">
            <Button
              color={data.status === "OutStock" ? "red" : "green"}
              ripple={false}
            >
              {data.status}
            </Button>
          </div>
        );
      },
    },

    // {
    //   label: "Tuỳ chọn",
    //   render: (data: any) => {
    //     return (
    //       <div className="flex gap-4 justify-end">
    //         <Button
    //           // onClick={() => {
    //           //   removeInventory(data.id);
    //           // }}
    //           color="red"
    //         >
    //           Xoá
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  // useEffect(() => {
  //   if (removeSuccess) {
  //     toast.success("Xoá thành công");
  //   }
  // }, [removeSuccess]);

  let content: React.ReactNode;

  if (isSuccess) {
    const { pageSize, pageIndex } = data;

    const updateData = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <Table config={configData} data={updateData}></Table>
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={data.pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            url="/admin/inventory"
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
        <Link to="/admin/Inventorys/add-Inventory">
          <Button className="flex gap-2 items-center">
            <AiOutlinePlusCircle />
            Thêm kho
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Inventory;
