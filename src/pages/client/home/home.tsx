import Banner from "./Banner";
import Categories from "./Categories";
import BoxTemplate from "components/box-template/box-template";
import { Button } from "@material-tailwind/react";
import CoreValue from "./Corevalue";
import ProductsCarousel from "components/products/product-carousel";
import { IProductDetailType } from "redux/api/types";
import { useGetProductHomeQuery } from "redux/api/catalog/product";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isSuccess, isLoading } = useGetProductHomeQuery(null);
  console.log('data', data);
  
  const dataCategory: {
    id: string;
    title: string;
    heading: string;
    href: string;
  }[] = [
    {
      id: Math.random().toString(),
      title: "Điện thoại",
      heading: "Our Product",
      href: `/category/${encodeURIComponent("Điện thoại")}`,
    },
    {
      id: Math.random().toString(),
      title: "LapTop",
      heading: "Sản phẩm của chúng tôi",
      href: `/category/${encodeURIComponent("LapTop")}`,
    },
    {
      id: Math.random().toString(),
      title: "Màn Hình",
      heading: "Sản phẩm của chúng tôi",
      href: `/category/${encodeURIComponent("Màn Hình")}`,
    },
    {
      id: Math.random().toString(),
      title: "Phụ Kiện",
      heading: "Sản phẩm của chúng tôi",
      href: `/category/${encodeURIComponent("Phụ Kiện")}`,
    },
    {
      id: Math.random().toString(),
      title: "Bàn Phím Gamming",
      heading: "Sản phẩm của chúng tôi",
      href: `/category/${encodeURIComponent("Bàn Phím Gamming")}`,
    },
  ];

  const renderData = isSuccess && data.map((item: any) => {
    const action = (
      <a href={item.href}>
        <Button size="sm">Xem Tất Cả</Button>
      </a>
    );

    let content;

  
    return (
      <BoxTemplate
        title={item.groupName}
        heading={"Sản phẩm của chúng tôi"}
        key={item.id}
        action={action}
      >
        <ProductsCarousel lengthCarousel={4} products={item.products} />
      </BoxTemplate>
    );
  });

  return (
    <div className="container">
      <Banner />
      <Categories />
      {renderData}
      <CoreValue />
    </div>
  );
};

export default Home;
