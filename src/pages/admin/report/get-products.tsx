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
import { IProductDetailType } from "redux/api/types";
import { IoSearchOutline } from "react-icons/io5";
import useDebounce from "hooks/use-debounce";
import { MeiliSearch } from "meilisearch";
import { IListProduct } from "./form-goods-receipt";

import { TiDeleteOutline } from "react-icons/ti";
const client = new MeiliSearch({
  host: "http://ecommerce.quochao.id.vn:7700/",
  apiKey: "5b9b8e6b23fdc6999583e126a2a8f271821668d9607a42bcc8ea7d86e587",
});

const index = client.getIndex("products");

interface GetProductsProps {
  listProduct: IListProduct[];
  handleChangeListProduct: Function;
}

const GetProducts: React.FC<GetProductsProps> = ({
  handleChangeListProduct,
  listProduct,
}) => {
  const [products, setProducts] = useState<IProductDetailType[]>();
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue, 500);
  useEffect(() => {
    debounceSearch.trim();
    async function searchWithMeili() {
      const search = (await index).search(debounceSearch);
      search.then((data) => {
        setProducts(data.hits as IProductDetailType[]);
      });
    }
    if (debounceSearch && debounceSearch !== "") {
      searchWithMeili();
    } else {
      setProducts(undefined);
    }
  }, [debounceSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleGetProduct = (item: IProductDetailType) => {
    setSearchValue("");
    setProducts(undefined);
    const product = listProduct.find((product) => product.id === item.id);
    if (!product) {
      const newItem = { ...item, quality: 0 };

      handleChangeListProduct(() => [...listProduct, newItem]);
    }
  };

  let content;

  if (products) {
    content = products.map((item) => {
      return (
        <ListItem
          onClick={() => {
            handleGetProduct(item);
          }}
          key={item.id}
        >
          <ListItemPrefix>
            <Avatar variant="circular" alt={item.name} src={item.imageUrl} />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              {item.name}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {item.description}
            </Typography>
          </div>
        </ListItem>
      );
    });
  }

  let listProductContent;
  if (listProduct.length !== 0) {
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
        }) as IListProduct[];
        handleChangeListProduct(updateArray);
      };

      return (
        <ListItem
          className="flex justify-between items-center"
          onClick={() => {
            handleGetProduct(item);
          }}
          key={item.id}
        >
          <div className="flex items-center">
            <ListItemPrefix>
              <Avatar variant="circular" alt={item.name} src={item.imageUrl} />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {item.name}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {item.description}
              </Typography>
            </div>
          </div>
          <div className="flex gap-4">
            <Input
              onChange={handleChangeQuality}
              crossOrigin={""}
              name="quality"
              value={item.quality}
              type="number"
              label="Số lượng"
            ></Input>

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
            onChange={handleChange}
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
          {products && products?.length !== 0 && (
            <Card className="absolute w-full h-fit top-14">
              <List>{content}</List>
            </Card>
          )}
        </div>
      </div>
      <div className="border border-purple-50 w-full h-full">
        <h3 className="font-semibold mx-4 my-6">Danh sách sản phẩm</h3>
        <Card className="w-full max-h-[200px] overflow-y-auto ">
          <List>{listProductContent}</List>
        </Card>
      </div>
    </section>
  );
};

export default GetProducts;
