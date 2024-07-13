import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IProductWarehouse } from "share/types/product";
import { Chip } from "@mui/material";

interface IStockTableProps {
  rows: IProductWarehouse[];
}

const StockTable = ({ rows }: IStockTableProps) => {
  const getStatus = (status: string) => {
    switch (status) {
      case "InStock":
        return (
          <Chip
            sx={{ width: 100, fontSize: 14 }}
            color="success"
            label="Còn hàng"
            variant="outlined"
          />
        );
      case "OutStock":
      default:
        return (
          <Chip
            sx={{ width: 100, fontSize: 14 }}
            variant="outlined"
            color="error"
            label="Hết hàng"
          />
        );
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Mã SKU</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.sku}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{getStatus(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
