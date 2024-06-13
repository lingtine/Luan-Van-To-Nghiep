import Button from "@material-tailwind/react/components/Button";
import Modal from "components/modal/modal";
import Pagination from "components/pagination/pagitnation";
import { useState } from "react";
import { useGetFiltersQuery } from "redux/api/catalog/filter";
import { IFilter } from "redux/api/types";
import FilterForm from "./components/FilterForm";

const Filter = () => {
  const [updateFilter, setUpdateFilter] = useState<IFilter | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  const { data: filterData } = useGetFiltersQuery([]);

  const handleClickFilter = (filter: IFilter) => {
    setUpdateFilter(filter);
  };

  return (
    <div className="max-h-[550px] overflow-y-scroll scroll-hidden">
      <div className="text-right">
        <Button
          color="green"
          className="mx-4 mb-4"
          onClick={() => setIsOpen(true)}
        >
          Thêm mới
        </Button>
      </div>
      <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-[100px] px-6 py-3">
              STT
            </th>
            <th scope="col" className="w-[250px] px-6 py-3">
              Tên bộ lọc
            </th>
            <th scope="col" className="w-[250px] px-6 py-3">
              Nhóm loại sản phẩm
            </th>
            <th scope="col" className="w-full px-6 py-3">
              Giá trị lọc
            </th>
          </tr>
        </thead>
        <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          {filterData?.data.map((filter, index) => (
            <tr
              key={filter.specificationId + filter.categoryGroupId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                handleClickFilter(filter);
              }}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
              >
                {filter.filterName}
              </th>
              <td className="px-6 py-4">{filter.categoryGroupName}</td>
              <td className="px-6 py-4">{filter.values.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* TODO: implement Pagination */}
      {/* <div className="flex justify-center my-8">
        <Pagination
          pageIndex={filterData?.pageIndex ?? 0}
          pageSize={filterData?.pageSize ?? 20}
          totalCount={filterData?.totalCount ?? 20}
          url="/admin/filters"
        />
      </div> */}

      {isOpen && (
        <Modal
          onClose={() => {
            setUpdateFilter(undefined);
            setIsOpen(false);
          }}
        >
          <FilterForm filter={updateFilter} onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Filter;
