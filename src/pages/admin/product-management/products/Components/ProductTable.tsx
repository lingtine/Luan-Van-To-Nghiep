import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFormatPrice } from "hooks/use-format-price";

import { IProductDetail } from "share/types/product";
import { Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import MUIConfirmDialog, {
  IContentConfirm,
} from "components/confirm-dialog/MUIConfirmDialog";
import { useState, useEffect } from "react";
import { useDeleteProductMutation } from "redux/api/catalog/product";
import { toast } from "react-toastify";

interface IProductTableProps {
  rows: IProductDetail[];
}

const ProductTable = ({ rows }: IProductTableProps) => {
  const [formatPrice] = useFormatPrice();
  const [productRemove, setProductRemove] = useState<IContentConfirm>();
  const [removeProduct, { isSuccess }] = useDeleteProductMutation();
  const handleToggleProduct = (data?: IContentConfirm) => {
    if (data) {
      setProductRemove(() => {
        return data;
      });
    } else {
      setProductRemove(undefined);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Xóa sản phẩm thành công");
    }
  }, [isSuccess]);

  const getProductStatus = (isInStock: boolean) => {
    if (isInStock) {
      return (
        <Chip
          sx={{ width: 100, fontSize: 14 }}
          color="success"
          label="Còn hàng"
          variant="outlined"
        />
      );
    } else {
      return (
        <Chip
          sx={{ width: 100, fontSize: 14 }}
          color="error"
          label="Hết hàng"
          variant="outlined"

        />
      );
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Hình ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Loại sản phẩm</TableCell>
              <TableCell align="center">Đơn giá</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img className="w-8" src={row.imageUrl} alt={row.name} />
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.category.name}</TableCell>
                <TableCell align="center">
                  {formatPrice.format(row.unitPrice)}
                </TableCell>
                <TableCell align="center">
                  {getProductStatus(row.isInStock)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 justify-end">
                    <Link to={`/admin/products/product-detail/${row.id}`}>
                      <Button variant="contained" color="info">
                        Chi tiết
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        handleToggleProduct({
                          id: row.id,
                          title: `Bạn có muốn xoá sản phẩm ${row.name}`,
                          content:
                            "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                        });
                      }}
                      color="error"
                      variant="contained"
                    >
                      Xoá
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MUIConfirmDialog
        data={productRemove}
        setData={handleToggleProduct}
        handleConfirm={() => {
          if (productRemove) {
            removeProduct(productRemove.id);
            handleToggleProduct();
          }
        }}
      />
    </>
  );
};

export default ProductTable;
