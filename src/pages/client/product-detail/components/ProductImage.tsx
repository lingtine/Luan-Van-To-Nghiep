import { useState } from "react";

interface IProductImageProps {
  mainImage?: string;
  relatedImages?: string[];
}

const ProductImage = ({ mainImage, relatedImages }: IProductImageProps) => {
  const [preview, setPreview] = useState(
    mainImage ||
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
  );

  const images = [
    mainImage ||
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png",
    ...(relatedImages || []),
  ];

  const handleViewImage = (url: string) => {
    setPreview(url);
  };

  return (
    <>
      <div className="flex-col h-full w-full gap-4">
        <div className="w-full h-[70%] flex items-center justify-center">
          <img className="content-center max-h-60" src={preview} alt="" />
        </div>
        <div className="basis-1/4 flex overflow-x-scroll mt-4 p-3 scrollbar-hide">
          {images?.map((image, index) => (
            <img
              className="w-20 h-20 ms-2"
              key={index}
              src={image}
              alt=""
              onClick={() => handleViewImage(image)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImage;
