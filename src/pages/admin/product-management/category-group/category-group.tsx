import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDeleteCategoryGroupMutation } from "redux/api/catalog/category-group";

import {
  ConfirmDialog,
  IContentConfirm,
} from "components/confirm-dialog/confirm-dialog";
import ModalAddCategoryGroup from "./modal-add-category-group";
import TableCategoryGroup from "./table-category-group";

import { toast } from "react-toastify";

const CategoryGroup = () => {
  const [removeCategoryGroup, { isSuccess: removeIsSuccess }] =
    useDeleteCategoryGroupMutation();

  //sản phẩm cần xoá
  const [categoryGroupRemove, setCategoryGroupRemove] =
    useState<IContentConfirm>();
  const [isOpen, setIsOpen] = useState(false);

  // mở phần thêm sản phẩm
  const handleToggleAdd = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryGroupRemove = (data?: IContentConfirm) => {
    if (data) {
      setCategoryGroupRemove(() => {
        return data;
      });
    } else {
      setCategoryGroupRemove(undefined);
    }
  };

  useEffect(() => {
    if (removeIsSuccess) {
      toast.success("Xoá thành công");
    }
  }, [removeIsSuccess]);

  return (
    <>
      <div className="px-4 ">
        <div className="flex justify-end my-4">
          <Button className="flex gap-2 items-center" onClick={handleToggleAdd}>
            <AiOutlinePlusCircle />
            Thêm Nhóm Danh Mục
          </Button>
        </div>
        <TableCategoryGroup onRemove={handleCategoryGroupRemove} />
      </div>
      <ConfirmDialog
        data={categoryGroupRemove}
        setData={handleCategoryGroupRemove}
        handleConfirm={() => {
          if (categoryGroupRemove) {
            removeCategoryGroup(categoryGroupRemove.id);
            handleCategoryGroupRemove();
          }
        }}
      />
      {isOpen && <ModalAddCategoryGroup onToggle={handleToggleAdd} />}
    </>
  );
};

export default CategoryGroup;
