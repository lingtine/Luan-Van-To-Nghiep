import { useState } from "react";
interface IProductImageProps {
  mainImage: string;
  relatedImages: string[];
}

const ProductImage = ({ mainImage, relatedImages }: IProductImageProps) => {
  const [preview, setPreview] = useState(mainImage);

  const images = [mainImage, ...relatedImages];

  const handleViewImage = (url: string) => {
    setPreview(url);
  };

  return (
    <>
      <div className="flex-col h-full w-full gap-4">
        <div className="w-full h-[70%] flex items-center justify-center">
          <img
            className="content-center max-h-60"
            src={preview}
            alt={preview}
          />
        </div>
        <div className="basis-1/4 flex overflow-x-scroll mt-4 p-3 scrollbar-hide">
          {images.map((image) => (
            <img
              className="w-20 h-20 ms-2"
              key={image}
              src={image}
              alt={image}
              onClick={() => handleViewImage(image)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImage;
