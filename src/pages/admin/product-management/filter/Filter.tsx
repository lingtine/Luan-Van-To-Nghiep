import { Spinner } from "@material-tailwind/react";
import { Button } from "@mui/material";
import Modal from "components/modal/modal";
import Pagination from "components/pagination/pagitnation";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetFiltersQuery } from "redux/api/catalog/filter";
import { IFilter } from "share/types/filter";
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
    refetch,
  } = useGetFiltersQuery({
    PageIndex: index,
    PageSize: 10,
  });

  let content;
  if (isSuccess) {
    const { pageSize, pageIndex, totalCount } = filterData;
    content = (
      <>
        <FilterTable refetch={refetch} rows={filterData.data} />
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
      <div className="text-right mb-4">
        <Button
          variant="contained"
          color="success"
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
          <FilterForm
            filter={updateFilter}
            onClose={() => setIsOpen(false)}
            refetch={refetch}
          />
        </Modal>
      )}
    </div>
  );
};

export default Filter;
