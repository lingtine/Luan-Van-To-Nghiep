import React from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  Typography,
} from "@material-tailwind/react";
import { IProductDetailType } from "redux/api/types";
import { useFormatPrice } from "hooks/use-format-price";
import { useNavigate } from "react-router-dom";
interface ProductsSearchProps {
  data: IProductDetailType[];
  onClear: Function;
}

const ProductsSearch: React.FC<ProductsSearchProps> = ({ data, onClear }) => {
  const [formatPrice] = useFormatPrice();
  const navigate = useNavigate();
  return (
    <Card className="w-full max-h-[320px] overflow-hidden overflow-y-scroll">
      <List>
        {data.map((product) => {
          return (
            <ListItem
              key={product.id}
              onClick={() => {
                navigate(`/product-detail/${product.id}`);
                onClear();
              }}
            >
              <ListItemPrefix>
                <img
                  alt={product.name}
                  className="w-32"
                  src={product.imageUrl}
                />
              </ListItemPrefix>
              <div>
                <div className="line-clamp-2">
                  <Typography variant="h6" color="blue-gray">
                    {product.name}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {formatPrice.format(product.unitPrice)}
                </Typography>
              </div>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default ProductsSearch;
