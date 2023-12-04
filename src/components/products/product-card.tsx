import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from "react";

import { IProductDetailType } from "redux/api/types";
import { useFormatPrice } from "hooks/use-format-price";
import { formatVND } from "utils/formatVND";

interface ProductCardProps {
  data: IProductDetailType | any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [formatPrice] = useFormatPrice();
  return (
    data && (
      <Card className="w-full h-fit border">
        <CardHeader shadow={false} floated={false} className="h-60">
          <img
            src={
              "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
            }
            alt={data.name}
            className="h-full w-full object-cover"
          />
          {/* <div className="bg-banner-1 h-full w-full object-cover"></div> */}
        </CardHeader>
        <CardBody className="p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="line-clamp-2">
            <Typography color="blue-gray" className="font-medium">
              {data.name}
            </Typography>
            </div>
            <Typography color="blue-gray" className="font-medium">
              {formatPrice.format(data.unitPrice)}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75 line-clamp-2 max-h-[42px]"
          >
            {data.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Thêm vào giỏ hàng
          </Button>
        </CardFooter>
      </Card>
    )
  );
};

export default ProductCard;
