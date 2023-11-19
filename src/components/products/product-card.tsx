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

interface ProductCardProps {
  data?: IProductDetailType;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  return (
    data &&
    <Card className="w-full h-fit border">
      <CardHeader shadow={false} floated={false} className="h-60">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {data.name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {data.unitPrice}
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
  );
};

export default ProductCard;
