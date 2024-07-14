import React from "react";
import { useFormatPrice } from "hooks/use-format-price";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IProductOrder } from "share/types/product";
import { IOrderDetail } from "share/types/order";
interface TableProductOrderProps {
  order: IOrderDetail;
}

const TableProductOrder: React.FC<TableProductOrderProps> = ({ order }) => {
  const [formatPrice] = useFormatPrice();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Đơn giá</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Thành tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.cart.items.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{formatPrice.format(row.unitPrice)}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell>
                {formatPrice.format(row.quantity * row.unitPrice)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ background: "#e3f2fd" }}>
            <TableCell>Tổng</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{formatPrice.format(order.amount)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProductOrder;
