import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  List,
  IconButton,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";

import { IoSearchOutline } from "react-icons/io5";
import useDebounce from "hooks/use-debounce";

import { IListProduct } from "./form-goods-receipt";
import { useGetProductsByParamsMutation } from "redux/api/catalog/product";
import { TiDeleteOutline } from "react-icons/ti";

interface GetProductsProps {
  listProduct: IListProduct[];
  handleChangeListProduct: Function;
}

const GetProducts: React.FC<GetProductsProps> = ({
  handleChangeListProduct,
  listProduct,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue, 500);
  const [handleSearch, { isSuccess, data }] = useGetProductsByParamsMutation();
  useEffect(() => {
    if (debounceSearch && debounceSearch !== "") {
      handleSearch({ Keyword: debounceSearch.toString() });
    }
  }, [debounceSearch, handleSearch]);

  let content;

  if (isSuccess && data) {
    content = data.map((item) => {
      return (
        <div
          key={item.id}
          role="button"
          onClick={() => {
            setSearchValue("");
            handleChangeListProduct(() => {
              if (listProduct) {
                if (listProduct.some((x) => x.id === item.id)) {
                  return listProduct;
                } else {
                  return [...listProduct, item];
                }
              } else {
                return [item];
              }
            });
          }}
        >
          <ListItem key={item.id}>
            <ListItemPrefix>
              <Avatar variant="circular" alt={item.name} src={item.imageUrl} />
            </ListItemPrefix>
            <div>
              <Typography className="text-sm" variant="h6" color="blue-gray">
                {item.name}
              </Typography>
              <p color="gray" className=" text-sm line-clamp-1 font-normal">
                {item.description}
              </p>
            </div>
          </ListItem>
        </div>
      );
    });
  }

  let listProductContent;
  if (listProduct && listProduct.length > 0) {
    listProductContent = listProduct.map((item) => {
      const handleChangeQuality = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateArray = listProduct.map((product) => {
          return product.id === item.id
            ? { ...product, quality: e.target.value }
            : product;
        }) as IListProduct[];
        handleChangeListProduct(updateArray);
      };

      const handleRemove = () => {
        const updateArray = listProduct.filter((product) => {
          return product.id !== item.id;
        });
        handleChangeListProduct(updateArray);
      };

      return (
        <ListItem
          ripple={true}
          className="flex justify-between items-center "
          key={item.id}
        >
          <div className="flex items-center">
            <ListItemPrefix>
              <Avatar variant="circular" alt={item.name} src={item.imageUrl} />
            </ListItemPrefix>
            <div className="overflow-hidden">
              <Typography variant="h6" color="blue-gray">
                {item.name}
              </Typography>
            </div>
          </div>
          <div className="flex gap-4">
            <Input
              onChange={handleChangeQuality}
              crossOrigin={""}
              name="quality"
              max={1000}
              min={0}
              value={item.quality}
              type="number"
              label="Số lượng"
            />

            <IconButton onClick={handleRemove}>
              <TiDeleteOutline />
            </IconButton>
          </div>
        </ListItem>
      );
    });
  }

  return (
    <section className="flex-[0_0_50%] flex gap-6 flex-col ">
      <header className="text-2xl my-4 font-bold ">
        Thông tin sản phẩm được nhập
      </header>

      <div className="flex items-center gap-8 ">
        <h6 className="text-base font-semibold">Tìm kiếm sản phẩm:</h6>
        <div className="relative flex items-center w-full max-w-[24rem]">
          <Input
            crossOrigin={""}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={searchValue ? "gray" : "blue-gray"}
            disabled={!searchValue}
            className="!absolute right-1 top-1 rounded"
          >
            <IoSearchOutline />
          </Button>

          {searchValue && (
            <Card className="absolute w-full h-fit top-14 z-40">
              <List className="max-h-[280px] overflow-y-auto ">{content}</List>
            </Card>
          )}
        </div>
      </div>
      <div className="border border-purple-50 w-full h-full">
        <h3 className="font-semibold mx-4 my-6">Danh sách sản phẩm</h3>
        {listProductContent && (
          <Card className="w-full max-h-[400px] overflow-y-auto">
            <List>{listProductContent}</List>
          </Card>
        )}
      </div>
    </section>
  );
};

export default GetProducts;
