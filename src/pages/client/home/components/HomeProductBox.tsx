import BoxTemplate from "components/box-template/box-template";
import ProductsCarousel from "components/products/product-carousel";
import { IProductDetail } from "share/types/product";
import { IWishlistProduct } from "redux/api/types";

interface IHomeProductBoxProps {
  heading: string;
  title: string;
  products: IWishlistProduct[] | IProductDetail[];
}

const HomeProductBox = ({ products, heading, title }: IHomeProductBoxProps) => {
  return (
    <>
      <BoxTemplate title={title} heading={heading}>
        <ProductsCarousel lengthCarousel={4} products={products} />
      </BoxTemplate>
    </>
  );
};

export default HomeProductBox;
