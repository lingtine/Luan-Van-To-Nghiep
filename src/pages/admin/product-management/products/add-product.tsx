import {
  Button,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Modal from "components/modal/modal";
import SelectBox, { ISelected } from "components/select-box/select-box";
import UploadMultiple from "components/upload-image/UploadMultiple";
import UploadImage from "components/upload-image/upload-image";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllBrandsQuery } from "redux/api/catalog/brand";
import { useGetCategoriesByParametersMutation } from "redux/api/catalog/category";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { useAddProductMutation } from "redux/api/catalog/product";
import {
  IProductInput,
  IProductSpecificationInput,
  IProductSpecification,
} from "share/types/product";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditorBuild from "ckeditor-options-remove-upload";
import FormAddSpecificationsProduct from "./form/form-add-specifications-product";
import TextEditor from "components/TextEditor/TextEditor";

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [description, setDescription] = useState("");

  const [relatedImages, setRelatedImages] = useState<FileList | null>(null);

  const [specifications, setSpecifications] = useState<IProductSpecification[]>(
    []
  );

  const [getCategories, { isSuccess: getCategorySuccess, data: categoryData }] =
    useGetCategoriesByParametersMutation();

  const { data: brandsData, isSuccess: getBrandsSuccess } =
    useGetAllBrandsQuery();

  const [addProduct, result] = useAddProductMutation();

  const { data: categoryGroupData, isSuccess: getCategoryGroupSuccess } =
    useGetAllCategoryGroupsQuery();

  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState<IProductInput>({
    name: "",
    description: "",
    image: new DataTransfer().files[0],
    unitPrice: 0,
    brandId: "",
    categoryId: "",
    sku: "",
    specifications: [],
    relatedImages: new DataTransfer().files,
  });

  const [categoryGroupSelected, setCategoryGroupSelected] =
    useState<ISelected>();

  const [brandsSelected, setBrandsSelected] = useState<ISelected>();

  const [categorySelected, setCategorySelected] = useState<ISelected>();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDataForm(() => {
      return { ...dataForm, [name]: value };
    });
  };

  const handleChangeImage = (image: File) => {
    setDataForm(() => {
      return { ...dataForm, image };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOpen) {
      if (
        dataForm.brandId.trim().toString().length === 0 ||
        dataForm.categoryId.trim().toString().length === 0 ||
        // dataForm.description.trim().toString().length === 0 ||
        dataForm.sku.trim().toString().length === 0 ||
        // !dataForm.image ||
        dataForm.name.trim().toString().length === 0 ||
        dataForm.unitPrice <= 0
      ) {
        toast.error("Thông tin không hợp lệ");
      } else {
        addProduct(dataForm);
      }
    }
  };

  const handleCloseSpecification = () => {
    setIsOpen(false);
  };

  const handleOpenSpecification = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setIsOpen(true);
  };

  const handleUploadRelatedImages = (images: FileList) => {
    setRelatedImages(images);
  };

  const handleRemoveSpecification = (specificationId: string) => {
    setSpecifications((prev) =>
      prev.filter((x) => x.specificationId !== specificationId)
    );
  };
  const handleAddSpecifications = (children: IProductSpecification[]) => {
    setSpecifications(children);
  };
  useEffect(() => {
    setDataForm(() => {
      return {
        ...dataForm,
        specifications: specifications.map(
          (x: IProductSpecification): IProductSpecificationInput => {
            return {
              specificationId: x.specificationId,
              specificationName: x.specificationName,
              specificationValue: x.specificationValue,
            };
          }
        ),
      };
    });
  }, [specifications]);

  useEffect(() => {
    if (relatedImages) {
      setDataForm(() => {
        return { ...dataForm, relatedImages: relatedImages };
      });
    }
  }, [relatedImages]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Tạo sản phẩm thành công");
      navigate("/admin/products");
    }
  }, [result, navigate]);

  const handleChangeDescription = (content: string) => {
    setDescription(content);
    setDataForm(() => {
      return { ...dataForm, description: content };
    });
  };

  let content, contentCategory, contentBrands: React.ReactNode;
  if (getCategoryGroupSuccess) {
    const updateData = categoryGroupData.map((item) => ({
      ...item,
      label: item.name,
    }));

    content = (
      <SelectBox
        label="Chọn Nhóm Danh Mục"
        onChange={(option: ISelected) => {
          getCategories({ GroupId: option.id, PageSize: 99 });
          setCategoryGroupSelected(option);
        }}
        options={updateData}
        selected={categoryGroupSelected}
      />
    );
  }
  if (getBrandsSuccess) {
    const updateData = brandsData.map((item) => ({
      ...item,
      label: item.name,
    }));

    contentBrands = (
      <SelectBox
        label="Chọn Thương Hiệu"
        onChange={(option: ISelected) => {
          setBrandsSelected(option);
          setDataForm(() => ({ ...dataForm, brandId: option.id }));
        }}
        selected={brandsSelected}
        options={updateData}
      />
    );
  }

  if (getCategorySuccess && categoryData) {
    const updateData = categoryData.map((item) => ({
      ...item,
      label: item.name,
    }));
    contentCategory = (
      <SelectBox
        label="Chọn Danh Mục"
        onChange={(option: ISelected) => {
          setCategorySelected(option);
          setDataForm(() => ({ ...dataForm, categoryId: option.id }));
        }}
        options={updateData}
        selected={categorySelected}
      />
    );
  }

  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/products"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm sản phẩm</h4>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-col justify-between gap-4 divide-y-2"
      >
        <div className="flex gap-4 justify-between mb-2">
          <section className="w-full flex-col">
            <Typography variant="h4" className="my-4">
              Thêm Hình ảnh
            </Typography>
            <UploadImage onChange={handleChangeImage} />
          </section>
          <section className=" w-full">
            <header className="text-2xl my-4 font-bold ">
              Thông tin sản phẩm
            </header>
            <div className="flex flex-col gap-4">
              <Input
                onChange={handleChange}
                name="name"
                value={dataForm?.name}
                crossOrigin={"use-credentials"}
                variant="outlined"
                label="Tên sản phẩm"
              />
              <Input
                onChange={handleChange}
                name="sku"
                value={dataForm?.sku}
                crossOrigin={"use-credentials"}
                variant="outlined"
                label="Sku"
              />
              <Input
                onChange={handleChange}
                name="unitPrice"
                type="number"
                value={dataForm?.unitPrice}
                crossOrigin={"use-credentials"}
                variant="outlined"
                label="Giá sản phẩm"
              />
              {contentBrands}
              {content}

              {contentCategory}
            </div>
          </section>
        </div>
        <div>
          <CKEditor
            editor={CustomEditorBuild}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleChangeDescription(data);
            }}
          />
        </div>

        <section>
          <div className="flex w-full justify-between gap-4 ">
            {/* Image */}
            <div className="w-full flex-row items-center mt-4 basis-1/2">
              <h1 className="text-xl font-semibold mb-4">Hình ảnh liên quan</h1>
              <UploadMultiple
                handleUploadRelatedImages={handleUploadRelatedImages}
              />
            </div>

            {/* Specification */}
            <div className="flex-col basis-1/2 items-start mt-4">
              <div className="flex justify-between">
                <h4 className="text-xl font-semibold">Thông số kỹ thuật</h4>
                <Button onClick={handleOpenSpecification}>Thêm thông số</Button>
              </div>

              <div className="my-4  overflow-y-scroll max-h-[400px]">
                {specifications.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 border border-primary-1 justify-between  items-center p-2"
                    >
                      <h5 className="min-w-[200px]  ">
                        {item.specificationName}
                      </h5>

                      <p> {item.specificationValue}</p>

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
              <Modal onClose={handleCloseSpecification}>
                <FormAddSpecificationsProduct
                  onClose={handleCloseSpecification}
                  productId={""}
                  productSpecifications={specifications}
                  isAdd={true}
                  handleAddSpecifications={handleAddSpecifications}
                />
              </Modal>
            )}
          </div>
          <div className="flex justify-end my-4">
            <Button type="submit">Thêm sản phẩm</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddProduct;
