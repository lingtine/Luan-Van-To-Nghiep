import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { IProductDetailType } from "redux/api/types";
import { useFormatPrice } from "hooks/use-format-price";
import { useAddToCartMutation } from "redux/api/cart/cart";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useAppSelector } from "redux/store";
interface ProductCardProps {
  data: IProductDetailType;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.authSlice);
  const [formatPrice] = useFormatPrice();
  const [addProduct, { isSuccess, isLoading }] = useAddToCartMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    }
  }, [isSuccess]);

  const handleAddToCart = () => {
    if (!accessToken) {
      toast.warning("Bạn cần phẩm đăng nhập trước");
      navigate("/login");
    } else {
      addProduct({
        productId: data.id,
        productName: data.name,
        quantity: 1,
        unitPrice: data.unitPrice,
      });
    }
  };

  return (
    data && (
      <Card className="w-full h-[450px] border relative group flex justify-between">
        {!data.isInStock && (
          <div className="absolute z-40 right-2 top-2 text-sm text-secondary p-1 rounded-md font-semibold bg-primary">
            Hết Hàng
          </div>
        )}
        {accessToken && data.isInStock && !isLoading && (
          <div className="hidden group-hover:block absolute bg z-50 right-0 top-[50%]">
            <IconButton className="rounded-full" onClick={handleAddToCart}>
              <MdAddShoppingCart />
            </IconButton>
          </div>
        )}
        <CardHeader shadow={false} floated={false} className="h-60">
          <img
            src={
              data.imageUrl ||
              "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
            }
            alt={data.name}
            className="h-full w-full max-h-[200px] max-w-[200px] object-contain"
            sizes=""
          />
        </CardHeader>

        <CardBody className="p-3">
          {/* <div className="mb-2 gap-4 flex items-center justify-between">
            <div className="line-clamp-2">
              <Typography color="blue-gray" className="font-medium text-sm">
                {data.name}
              </Typography>
            </div>
            <Typography color="blue-gray" className="font-medium">
              {formatPrice.format(data.unitPrice)}
            </Typography>
          </div> */}
          <div className="line-clamp-2">
            <Typography
              color="blue-gray"
              className="font-medium text-sm overflow-hidden"
            >
              {data.name}
            </Typography>
          </div>
          <div className="flex-col justify-between items-center">
            <Rating readonly value={Math.round(data.numberOfStar)} />
            <Typography color="blue-gray" className="font-medium text-right">
              {formatPrice.format(data.unitPrice)}
            </Typography>
          </div>

          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75 line-clamp-2 max-h-[42px] overflow-hidden"
          >
            {data.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            onClick={() => navigate(`/product-detail/${data.id}`)}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Xem chi tiết
          </Button>
        </CardFooter>
      </Card>
    )
  );
};

export default ProductCard;
