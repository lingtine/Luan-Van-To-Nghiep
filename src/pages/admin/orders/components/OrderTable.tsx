import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IOrderDetail } from "share/types/order";
import { formatVND } from "utils/formatVND";
import { Link } from "react-router-dom";

interface IOrderTableProps {
  data: IOrderDetail[];
}

const OrderTable = ({ data: rows }: IOrderTableProps) => {
  const status = [
    { id: "Created", label: "Mới" },
    { id: "Delivered", label: "Đã giao" },
    { id: "Returned", label: "Đã trả lại" },
    { id: "Canceled", label: "Đã hủy" },
  ];

  const getStatus = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Chip
            variant="outlined"
            sx={{ width: 100, fontSize: 14 }}
            color="success"
            label="Đã giao"
          />
        );
      case "Returned":
        return (
          <Chip
            variant="outlined"
            sx={{ width: 100, fontSize: 14 }}
            color="primary"
            label="Đã trả hàng"
          />
        );
      case "Canceled":
        return (
          <Chip
            variant="outlined"
            sx={{ width: 100, fontSize: 14 }}
            color="error"
            label="Đã hủy"
          />
        );
      case "Created":
      default:
        return (
          <Chip
            variant="outlined"
            sx={{ width: 100, fontSize: 14 }}
            color="info"
            label="Mới"
          />
        );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell>Tên khách hàng</TableCell>
            <TableCell align="center">Số điện thoại</TableCell>
            <TableCell align="center">Tổng tiền</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
            <TableCell align="center"></TableCell>
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
                {row.deliveryInfo.fullName}
              </TableCell>
              <TableCell align="center">
                {row.deliveryInfo.phoneNumber}
              </TableCell>
              <TableCell align="center">{formatVND(row.cost)}</TableCell>
              <TableCell align="center">{getStatus(row.status)}</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="info">
                  <Link to={`order-detail/${row.id}`}>Chi tiết</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
