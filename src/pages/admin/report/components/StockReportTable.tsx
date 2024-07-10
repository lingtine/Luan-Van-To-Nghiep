import { IStockReportItem, IStockReportTable } from "share/types/warehouse";
import { ICustomerSale } from "share/types/order";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
interface ITable {
  data: IStockReportItem[];
}

const StockReportTable = ({ data: rows }: ITable) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell component="th" scope="row">
              Tên sản phẩm
            </TableCell>
            <TableCell align="center">Tồn đâu kỳ</TableCell>
            <TableCell align="center">Nhập trong kỳ</TableCell>
            <TableCell align="center">Xuất trong kỳ</TableCell>
            <TableCell align="center">Tồn cuối kỳ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.openingStock}</TableCell>
              <TableCell align="center">{row.inwardStock}</TableCell>
              <TableCell align="center">{row.outwardStock}</TableCell>
              <TableCell align="center">{row.closingStock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockReportTable;
