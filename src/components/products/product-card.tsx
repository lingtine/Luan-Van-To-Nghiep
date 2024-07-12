import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
  Chip,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { IProductDetail } from "share/types/product";
import { useFormatPrice } from "hooks/use-format-price";
import { useAddToCartMutation } from "redux/api/cart/cart";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useAppSelector } from "redux/store";
import { IWishlistProduct } from "redux/api/types";
import { Link } from "react-router-dom";
interface ProductCardProps {
  data: IProductDetail | IWishlistProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.authSlice);
  const [formatPrice] = useFormatPrice();
  const [addProduct, { isSuccess, isLoading, reset }] = useAddToCartMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
      reset();
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
    <Card className="w-full h-[400px] border relative group flex justify-between overflow-hidden  ">
      {!data.isInStock && (
        <div className="absolute z-40 right-2 top-2">
          <Chip className="bg-danger" value="Hết Hàng" />
        </div>
      )}
      {accessToken && data.isInStock && !isLoading && (
        <div className="absolute z-50 right-4 bottom-6">
          <IconButton
            className=" group-hover:bg-primary group-hover:text-white text-black bg-light-border-subtle"
            onClick={handleAddToCart}
          >
            <CiShoppingCart className="text-xl" />
          </IconButton>
        </div>
      )}
      <Link to={`/product-detail/${data.id}`}>
        <CardHeader
          shadow={false}
          floated={false}
          className="h-60 flex justify-center items-end"
        >
          <img
            src={data.imageUrl}
            alt={data.name}
            className="h-full w-full max-h-[200px] max-w-[200px] object-contain"
          />
        </CardHeader>

        <CardBody>
          <Rating readonly value={Math.round(data.numberOfStar)} />
          <div className="line-clamp-2">
            <Typography color="blue-gray" variant="h6" className="text-xs">
              {data.name}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="flex justify-between items-center">
            <div>
              <Typography
                color="blue-gray"
                variant="h6"
                className="font-semibold text-right"
              >
                {formatPrice.format(data.unitPrice)}
              </Typography>
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
