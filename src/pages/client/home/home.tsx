import Banner from "./Banner";
import Categories from "./Categories";
import BoxTemplate from "components/box-template/box-template";
import { Button } from "@material-tailwind/react";
import CoreValue from "./Corevalue";
import ProductsCarousel from "components/products/product-carousel";
import { IProductDetailType } from "redux/api/types";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const data: {
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
  

  const renderData = data.map((item) => {
    const action = (
      <a href={item.href}>
        <Button size="sm">Xem Tất Cả</Button>
      </a>
    );

    let content;

    const dataProducts = [
      {
        brand: {
          id: "fdbc43dd-b84f-4fc0-35cc-08dbda28c0ea",
          name: "Apple",
          description: "Apple",
          image: new DataTransfer().files[0],
        },
        category: {
          id: "668ea461-b6e2-4824-e602-08dbda28e549",
          name: "iPhone",
          description: "iPhone",
          categoryGroupId: "9b664fa1-ca71-4ec4-d0a5-08dbda28cad2",
        },
        description: "iPhone 15 Pro Max",
        id: "2097f951-41563-4198-e458-08dđấbda290791",
        imageUrl:
          "https://bucket.hahaho.dev/ecommerce/products/2097f951-4156-4198-e458-08dbda290791.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2fhsyEv6tfqLNi7vA3dT%2F20231117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T044134Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&response-content-type=image%2Fjpeg&X-Amz-Signature=3db27f1649a0c9b4bd59e86565bfccbf17803e9011e23c434b3a412afa18c352",
        isActive: true,
        isInStock: false,
        likeCount: 0,
        name: "iPhone 15 Pro Ma",
        numberOfStar: 5,
        productImages: [],
        productSpecifications: [],
        rateCount: 0,
        unitPrice: 1111,
        viewCount: 38,
      },
      {
        brand: {
          id: "fdbc43dd-b84f-4fc0-35cc-08dbda28c0ea",
          name: "Apple",
          description: "Apple",
          image: new DataTransfer().files[0],
        },
        category: {
          id: "668ea461-b6e2-4824-e602-08dbda28e549",
          name: "iPhone",
          description: "iPhone",
          categoryGroupId: "9b664fa1-ca71-4ec4-d0a5-08dbda28cad2",
        },
        description: "iPhone 15 Pro Max",
        id: "2097f951-41563-4198-e458-08dbda290791",
        imageUrl:
          "https://bucket.hahaho.dev/ecommerce/products/2097f951-4156-4198-e458-08dbda290791.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2fhsyEv6tfqLNi7vA3dT%2F20231117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T044134Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&response-content-type=image%2Fjpeg&X-Amz-Signature=3db27f1649a0c9b4bd59e86565bfccbf17803e9011e23c434b3a412afa18c352",
        isActive: true,
        isInStock: false,
        likeCount: 0,
        name: "iPhone 15 Pro Ma",
        numberOfStar: 5,
        productImages: [],
        productSpecifications: [],
        rateCount: 0,
        unitPrice: 1111,
        viewCount: 38,
      },
      {
        brand: {
          id: "fdbc43dd-b84f-4fc0-35cc-08dbda28c0ea",
          name: "Apple",
          description: "Apple",
          image: new DataTransfer().files[0],
        },
        category: {
          id: "668ea461-b6e2-4824-e602-08dbda28e549",
          name: "iPhone",
          description: "iPhone",
          categoryGroupId: "9b664fa1-ca71-4ec4-d0a5-08dbda28cad2",
        },
        description: "iPhone 15 Pro Max",
        id: "2097f951-4156-4111298-e458-08dbda290791",
        imageUrl:
          "https://bucket.hahaho.dev/ecommerce/products/2097f951-4156-4198-e458-08dbda290791.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2fhsyEv6tfqLNi7vA3dT%2F20231117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T044134Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&response-content-type=image%2Fjpeg&X-Amz-Signature=3db27f1649a0c9b4bd59e86565bfccbf17803e9011e23c434b3a412afa18c352",
        isActive: true,
        isInStock: false,
        likeCount: 0,
        name: "iPhone 15 Pro Ma",
        numberOfStar: 5,
        productImages: [],
        productSpecifications: [],
        rateCount: 0,
        unitPrice: 1111,
        viewCount: 38,
      },
      ,
      {
        brand: {
          id: "fdbc43dd-b84f-4fc0-35cc-08dbda28c0ea",
          name: "Apple",
          description: "Apple",
          image: new DataTransfer().files[0],
        },
        category: {
          id: "668ea461-b6e2-4824-e602-08dbda28e549",
          name: "iPhone",
          description: "iPhone",
          categoryGroupId: "9b664fa1-ca71-4ec4-d0a5-08dbda28cad2",
        },
        description: "iPhone 15 Pro Max",
        id: "2097f951-4156-4198-312312e458-08dbda290791",
        imageUrl:
          "https://bucket.hahaho.dev/ecommerce/products/2097f951-4156-4198-e458-08dbda290791.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2fhsyEv6tfqLNi7vA3dT%2F20231117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T044134Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&response-content-type=image%2Fjpeg&X-Amz-Signature=3db27f1649a0c9b4bd59e86565bfccbf17803e9011e23c434b3a412afa18c352",
        isActive: true,
        isInStock: false,
        likeCount: 0,
        name: "iPhone 15 Pro Ma",
        numberOfStar: 5,
        productImages: [],
        productSpecifications: [],
        rateCount: 0,
        unitPrice: 1111,
        viewCount: 38,
      },
      {
        brand: {
          id: "fdbc43dd-b84f-4fc0-35cc-08dbda28c0ea",
          name: "Apple",
          description: "Apple",
          image: new DataTransfer().files[0],
        },
        category: {
          id: "668ea461-b6e2-3123124824-e602-08dbda28e549",
          name: "iPhone",
          description: "iPhone",
          categoryGroupId: "9b664fa1-ca71-4ec4-d0a5-08dbda28cad2",
        },
        description: "iPhone 15 Pro Max",
        id: "2097f951-4156-123123-e458-08dbda290791",
        imageUrl:
          "https://bucket.hahaho.dev/ecommerce/products/2097f951-4156-4198-e458-08dbda290791.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2fhsyEv6tfqLNi7vA3dT%2F20231117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T044134Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&response-content-type=image%2Fjpeg&X-Amz-Signature=3db27f1649a0c9b4bd59e86565bfccbf17803e9011e23c434b3a412afa18c352",
        isActive: true,
        isInStock: false,
        likeCount: 0,
        name: "iPhone 15 Pro Ma",
        numberOfStar: 5,
        productImages: [],
        productSpecifications: [],
        rateCount: 0,
        unitPrice: 1111,
        viewCount: 38,
      },
      {
        brand: {
          id: "fdbc43dd-b84f-4fc0-35cc-08dbda28c0ea",
          name: "Apple",
          description: "Apple",
          image: new DataTransfer().files[0],
        },
        category: {
          id: "668ea461-b6e2-4824-e602-08dbda28e549",
          name: "iPhone",
          description: "iPhone",
          categoryGroupId: "9b664fa1-ca71-4ec4-d0a5-08dbda28cad2",
        },
        description: "iPhone 15 Pro Max",
        id: "2097f951-4156-4198-e213312458-08dbda290791",
        imageUrl:
          "https://bucket.hahaho.dev/ecommerce/products/2097f951-4156-4198-e458-08dbda290791.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2fhsyEv6tfqLNi7vA3dT%2F20231117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T044134Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&response-content-type=image%2Fjpeg&X-Amz-Signature=3db27f1649a0c9b4bd59e86565bfccbf17803e9011e23c434b3a412afa18c352",
        isActive: true,
        isInStock: false,
        likeCount: 0,
        name: "iPhone 15 Pro Ma",
        numberOfStar: 5,
        productImages: [],
        productSpecifications: [],
        rateCount: 0,
        unitPrice: 1111,
        viewCount: 38,
      },
      {
        brand: {
          id: "fdbc43dd-b84f-4fc0-35cc-08dbda28c0ea",
          name: "Apple",
          description: "Apple",
          image: new DataTransfer().files[0],
        },
        category: {
          id: "668ea461-b6e2-4824-e602-08dbda28e549",
          name: "iPhone",
          description: "iPhone",
          categoryGroupId: "9b664fa1-ca71-4ec4-d0a5-08dbda28cad2",
        },
        description: "iPhone 15 Pro Max",
        id: "2097f951-4156-41912312318-e458-08dbda290791",
        imageUrl:
          "https://bucket.hahaho.dev/ecommerce/products/2097f951-4156-4198-e458-08dbda290791.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=2fhsyEv6tfqLNi7vA3dT%2F20231117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T044134Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&response-content-type=image%2Fjpeg&X-Amz-Signature=3db27f1649a0c9b4bd59e86565bfccbf17803e9011e23c434b3a412afa18c352",
        isActive: true,
        isInStock: false,
        likeCount: 0,
        name: "iPhone 15 Pro Ma",
        numberOfStar: 5,
        productImages: [],
        productSpecifications: [],
        rateCount: 0,
        unitPrice: 1111,
        viewCount: 38,
      },
    ] as IProductDetailType[];

    return (
      <BoxTemplate
        title={item.title}
        heading={item.heading}
        key={item.id}
        action={action}
      >
        <ProductsCarousel lengthCarousel={4} products={dataProducts} />
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
