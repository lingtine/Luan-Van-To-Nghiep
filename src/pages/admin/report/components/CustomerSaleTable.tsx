import { ICustomerSale } from "share/types/order";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFormatPrice } from "hooks/use-format-price";
interface ICustomerSaleTableProps {
  data: ICustomerSale[];
}

const CustomerSaleTable = ({ data: rows }: ICustomerSaleTableProps) => {
  const [formatPrice] = useFormatPrice();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell component="th" scope="row">
              Tên khách hàng
            </TableCell>
            <TableCell align="center">Tổng đơn hàng</TableCell>
            <TableCell align="center">Số lượng sản phẩm</TableCell>
            <TableCell align="center">Tổng tiền</TableCell>
            <TableCell align="center">Tổng giảm giá</TableCell>
            <TableCell align="center">Doanh thu</TableCell>
            <TableCell align="center">Tổng số đơn hoàn trả</TableCell>
            <TableCell align="center">Số sản phẩm hoàn trả</TableCell>
            <TableCell align="center">Tổng tiền hoàn trả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.soldCount}</TableCell>
              <TableCell align="center">{row.soldQuantity}</TableCell>
              <TableCell align="center">
                {formatPrice.format(row.soldAmount)}
              </TableCell>
              <TableCell align="center">
                {formatPrice.format(row.totalDiscount)}
              </TableCell>
              <TableCell align="center">
                {formatPrice.format(row.totalProfit)}
              </TableCell>
              <TableCell align="center">{row.returnedCount}</TableCell>
              <TableCell align="center">{row.returnedQuantity}</TableCell>
              <TableCell align="center">
                {formatPrice.format(row.returnedAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerSaleTable;
