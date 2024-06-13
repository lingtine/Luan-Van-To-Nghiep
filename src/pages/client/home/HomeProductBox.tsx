import BoxTemplate from "components/box-template/box-template";
import ProductsCarousel from "components/products/product-carousel";
import { IWishlistProduct } from "redux/api/types";
import { IProductDetail } from "share/types/product";

interface IHomeProductBoxProps {
  heading: string;
  title: string;
  products: IProductDetail[]
}

const HomeProductBox = ({ products, heading, title }: IHomeProductBoxProps) => {
  return (
    <>
      <BoxTemplate title={title} heading={heading}>
        <ProductsCarousel lengthCarousel={4} products={products ?? []} />
      </BoxTemplate>
    </>
  );
};

export default HomeProductBox;
