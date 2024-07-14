import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IReportProduct } from "share/types/report";
import { formatVND } from "utils/formatVND";

interface IInventoryProductTableProps {
  rows: IReportProduct[];
}
const InventoryProductTable = ({ rows }: IInventoryProductTableProps) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  <img src={row.imageUrl} alt="" width={100} height={100} />
                </TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{formatVND(row.unitPrice!)}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{formatVND(row.quantity * row.unitPrice!)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InventoryProductTable;
