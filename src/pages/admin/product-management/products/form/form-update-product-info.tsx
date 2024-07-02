import React from "react";
import { Input, Button, Textarea, IconButton } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useRemoveSpecificationForProductMutation } from "redux/api/catalog/product";

import { IProductDetail, IProductSpecification } from "share/types/product";

import UploadImage from "components/upload-image/upload-image";

import { CiTrash } from "react-icons/ci";
import UploadMultiple from "components/upload-image/UploadMultiple";
import Modal from "components/modal/modal";
import FormAddSpecificationsProduct from "./form-add-specifications-product";
interface FormUpdateProductInfoProps {
  product: IProductDetail;
}

const FormUpdateProductInfo: React.FC<FormUpdateProductInfoProps> = ({
  product,
}) => {
  const [isUpload, setIsUpload] = useState(false);
  const [image] = useState<string | undefined>(product.imageUrl);
  const [isOpen, setIsOpen] = useState(false);
  const [relatedImages, setRelatedImages] = useState<FileList | null>(null);
  const [specifications] = useState<IProductSpecification[]>(
    product.productSpecifications
  );

  const [removeSpecification] = useRemoveSpecificationForProductMutation();
  //const [updateProduct, result] = useUpdateProductMutation();
  const [isUpdate, setIsUpdate] = useState(false);

  const [dataForm, setDataForm] = useState<{
    id: string;
    name: string;
    description: string;
    image: File;
    unitPrice: number;
    relatedImages?: FileList;
    specifications?: IProductSpecification[];
  }>({
    id: product.id,
    name: product.name,
    description: product.description,
    image: new DataTransfer().files[0],
    unitPrice: product.unitPrice,
    relatedImages: new DataTransfer().files,
    specifications: product.productSpecifications,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (dataForm.image) {
    //   updateProduct(dataForm);
    // } else {
    // const { image, ...updateDataForm } = dataForm;
    if (!isOpen) {
      //updateProduct(dataForm);
    }
    // }
  };

  const handleChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataForm(() => ({ ...dataForm, [name]: value }));
  };

  const handleChangeImage = (image: File) => {
    setDataForm(() => {
      return { ...dataForm, image: image };
    });
  };

  const handleUploadRelatedImages = (images: FileList) => {
    setRelatedImages(images);
    setDataForm(() => {
      return { ...dataForm, relatedImages: images };
    });
  };

  const handleRemoveSpecification = (specificationId: string) => {
    removeSpecification({ productId: product.id, data: [specificationId] });
  };

  const handleOpen = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsUpdate(true);
  }, [specifications]);

  useEffect(() => {
    setIsUpdate(true);

    if (relatedImages) {
      setDataForm(() => {
        return { ...dataForm, relatedImages: relatedImages };
      });
    }
  }, [relatedImages, dataForm]);

  useEffect(() => {
    if (
      dataForm.name !== product.name &&
      dataForm.unitPrice !== product.unitPrice &&
      dataForm.description !== product.description &&
      dataForm.image
    ) {
      setIsUpdate(true);
    }
  }, [dataForm, product.name, product.unitPrice, product.description]);

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="flex-col flex-wrap gap-4 divide-y-4"
    >
      {/* Main image + Information */}
      <div className="flex justify-between w-full gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div>
            <label className="text-sm font-semibold">Tên sản phẩm</label>
            <Input
              crossOrigin={""}
              value={dataForm.name}
              name="name"
              onChange={handleChangeData}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Giá sản phẩm</label>
            <Input
              value={dataForm.unitPrice || ""}
              name="unitPrice"
              onChange={handleChangeData}
              type="number"
              crossOrigin={""}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Miêu tả sản phẩm</label>
            <Textarea
              value={dataForm.description}
              name="description"
              onChange={handleChangeData}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Danh mục sản phẩm</label>
            <Input
              crossOrigin={""}
              readOnly
              value={product.category.name}
              name="category"
              disabled
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Thương hiệu</label>
            <Input
              crossOrigin={""}
              readOnly
              value={product.brand.name}
              name="brand"
              disabled
            />
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-sm font-semibold">Hình ảnh sản phẩm</h3>
          {isUpload ? (
            <UploadImage onChange={handleChangeImage} />
          ) : (
            <img
              className="h-96 w-full object-contain "
              src={image}
              alt={product.name}
            />
          )}
          <div className="w-full text-right">
            {!isUpload && (
              <Button
                onClick={() => {
                  setIsUpload(true);
                }}
                className=" bg-primary-3-700"
              >
                Update
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Related images + Specifications */}
      <div className="mt-4">
        <div className="flex w-full justify-between gap-4">
          {/* Image */}
          <div className="w-full flex-row items-center mt-4 basis-1/2">
            <h1 className="text-xl font-semibold mb-4">Hình ảnh liên quan</h1>
            <UploadMultiple
              handleUploadRelatedImages={handleUploadRelatedImages}
              images={product.productImages}
            />
          </div>

          {/* Specification */}
          <div className="flex-col basis-1/2 items-start mt-4">
            <div className="flex justify-between">
              <h4 className="text-xl font-semibold">Thông số kỹ thuật</h4>
              <Button onClick={handleOpen}>Thêm thông số</Button>
            </div>

            <div className="my-4 overflow-y-scroll max-h-[400px]">
              {specifications.map((item) => {
                return (
                  <div className="flex gap-4 border border-primary-1 justify-between items-center p-2">
                    <h5 className="min-w-[200px]  ">
                      {item.specificationName}
                    </h5>

                    <p>{item.specificationValue}</p>

                    <IconButton
                      className="min-w-[40px]"
                      onClick={() =>
                        handleRemoveSpecification(item.specificationId)
                      }
                    >
                      <CiTrash />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Modal */}
          {isOpen && (
            <Modal onClose={handleClose}>
              <FormAddSpecificationsProduct
                onClose={handleClose}
                productId={product.id}
                productSpecifications={specifications}
                isAdd={true}
              />
            </Modal>
          )}
        </div>

        {/* Submit */}
        <div className="text-right">
          <Button disabled={!isUpdate} type="submit">
            Cập nhật
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormUpdateProductInfo;
