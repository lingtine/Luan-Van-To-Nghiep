import Banner from "./Banner";
import Categories from "./Categories";
import BoxTemplate from "components/box-template/box-template";
import Button from "components/button/button";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const data = [
    {
      id: Math.random.toString(),
      title: "Điện thoại",
      heading: "Our Product",
      href: "/",
    },
    {
      id: Math.random.toString(),
      title: "LapTop",
      heading: "Sản phẩm của chúng tôi",
      href: "/",
    },
    {
      id: Math.random.toString(),
      title: "Màn Hình",
      heading: "Sản phẩm của chúng tôi",
      href: "/",
    },
    {
      id: Math.random.toString(),
      title: "Phụ Kiện",
      heading: "Sản phẩm của chúng tôi",
      href: "/",
    },
    {
      id: Math.random.toString(),
      title: "Bàn Phím Gamming",
      heading: "Sản phẩm của chúng tôi",
      href: "/",
    },
  ];

  const renderData = data.map((item) => {
    const action = (
      <Button secondary small>
        <a href={item.href}>Xem Tất Cả</a>
      </Button>
    );

    return (
      <BoxTemplate
        title={item.title}
        heading={item.heading}
        key={item.id}
        action={action}
      >
        <div></div>
      </BoxTemplate>
    );
  });

  return (
    <div className="container">
      <Banner />
      <Categories />
      {renderData}
    </div>
  );
};

export default Home;
