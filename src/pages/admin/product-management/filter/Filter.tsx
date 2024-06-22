import Button from "@material-tailwind/react/components/Button";
import Modal from "components/modal/modal";
import Pagination from "components/pagination/pagitnation";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetFiltersQuery } from "redux/api/catalog/filter";
import { IFilter, IFilterTable } from "share/types/filter";
import { Spinner } from "@material-tailwind/react";
import FilterForm from "./components/FilterForm";
import FilterTable from "./components/filter-table";

const Filter = () => {
  const [updateFilter, setUpdateFilter] = useState<IFilter | undefined>(
    undefined
  );
  const { index } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: filterData,
    isSuccess,
    isLoading,
  } = useGetFiltersQuery({
    PageIndex: index,
  });

  const handleClickFilter = (filter: IFilter) => {
    setUpdateFilter(filter);
  };

  let content;
  if (isSuccess) {
    const { pageSize, pageIndex, totalCount } = filterData;
    const updateData: IFilterTable[] = filterData.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = (
      <>
        <FilterTable data={updateData} />
        <div className="flex justify-center my-8">
          <Pagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalCount={totalCount}
            url={"/admin/filters"}
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
    <div className="p-4">
      <div className="text-right">
        <Button
          color="green"
          className="mx-4 mb-4"
          onClick={() => setIsOpen(true)}
        >
          Thêm mới
        </Button>
      </div>

      {content}
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
