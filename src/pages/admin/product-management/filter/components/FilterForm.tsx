import { IconButton, Input } from "@material-tailwind/react";
import { Button } from "@mui/material";
import SelectBox, { ISelected } from "components/select-box/select-box";
import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import { useGetCategoryGroupsQuery } from "redux/api/catalog/category-group";
import {
  useAddFilterMutation,
  useUpdateFilterMutation,
} from "redux/api/catalog/filter";
import { useGetSpecificationsQuery } from "redux/api/catalog/specification";
import { IAddFilter, IFilter } from "share/types/filter";

interface IFilterFormProps {
  onClose: Function;
  filter?: IFilter;
  refetch?: any;
}

const FilterForm = ({
  filter = {
    categoryGroupId: "",
    filterName: "",
    id: "",
    specificationId: "",
    values: [],
    specificationName: "",
    categoryGroupName: "",
  },
  onClose,
  refetch,
}: IFilterFormProps) => {
  const isUpdate = filter.id !== "";
  const [name, setName] = useState(
    filter.filterName.length === 0
      ? filter.specificationName
      : filter.filterName
  );

  const [group, setGroup] = useState<ISelected>({
    id: filter.categoryGroupId,
    label: filter.categoryGroupName,
  });

  const [specification, setSpecification] = useState<ISelected>({
    id: filter.specificationId,
    label: filter.categoryGroupName,
  });

  const [values, setValues] = useState<string[]>(
    filter.values.length === 0 ? [""] : filter.values
  );

  const [addFilter, isSuccess] = useAddFilterMutation();

  const [updateFilter] = useUpdateFilterMutation();

  const { data: specificationData } = useGetSpecificationsQuery({
    PageSize: 9999,
  });

  const { data: categoryGroupData } = useGetCategoryGroupsQuery({
    PageSize: 9999,
  });

  const groupsOptions =
    categoryGroupData !== undefined
      ? categoryGroupData.data.map((item) => ({
          ...item,
          label: item.name,
        }))
      : [];

  const specificationOptions =
    specificationData !== undefined
      ? specificationData?.data.map((item) => ({
          ...item,
          label: item.name,
        }))
      : [];

  const handleChangeValue = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;

    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
  };

  const handleAddValue = () => {
    setValues(() => [...values, ""]);
  };

  const handleRemoveValue = (index: number) => {
    setValues((prev) => {
      const newValues = [...prev];
      newValues.splice(index, 1);
      return newValues;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filter: IAddFilter = {
      filterName: name,
      categoryGroupId: group?.id ?? "",
      specificationId: specification?.id ?? "",
      values: values,
    };

    if (isUpdate) {
      await updateFilter(filter);
    } else {
      await addFilter(filter);
    }

    if (isSuccess) {
      toast.success("Thao tác thành công");
      if (refetch) {
        refetch();
      }
      onClose();
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="flex gap-4">
        <SelectBox
          label="Nhóm loại sản phẩm"
          options={groupsOptions}
          onChange={(option: ISelected) => {
            if (!isUpdate) {
              setGroup(option);
            }
          }}
          selected={group}
        />
        <SelectBox
          label="Thông số kỹ thuật"
          options={specificationOptions}
          onChange={(option: ISelected) => {
            if (!isUpdate) {
              setName(option.label)
              setSpecification(option);
            }
          }}
          selected={specification}
        />
      </div>
      <div className="mt-4">
        <Input
          required
          name="filterName"
          label="Tên bộ lọc"
          type="text"
          crossOrigin={""}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="max-h-[400px] flex-col items-center justify-between overflow-y-auto scroll-hidden">
        {values.map((value, index) => (
          <div className="mt-4 mr-2 flex gap-2" key={index}>
            <Input
              required
              name="value"
              label="Giá trị lọc"
              type="text"
              crossOrigin={""}
              value={value}
              onChange={(event) => handleChangeValue(index, event)}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleRemoveValue(index);
              }}
            >
              <CiTrash />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          variant="contained"
          className="w-full"
          color="info"
          onClick={handleAddValue}
        >
          Thêm giá trị
        </Button>
        <Button
          variant="contained"
          type="submit"
          className="w-full"
          color="success"
        >
          Lưu
        </Button>
      </div>
    </form>
  );
};

export default FilterForm;
