import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { parseISO, parse, isValid, format } from "date-fns";
import { IUserDetail } from "redux/api/types";
interface ICustomerTable extends IUserDetail {
  index: number;
}

function CustomerTable({ data: rows }: { data: ICustomerTable[] }) {

  const getGender = (status: string) => {
    switch (status) {
      case "Female":
        return (
          <Chip sx={{ width: 100, fontSize: 14 }}
           color="primary" label="Nữ" variant="outlined" />
        );
      case "Male":
      default:
        return (
          <Chip sx={{ width: 100, fontSize: 14 }} 
          variant="outlined"
          color="success" label="Nam" />
        );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">STT</TableCell>
            <TableCell component="th" scope="row">
              Tên khách hàng
            </TableCell>
            <TableCell align="center">Giới tính</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Số điện thoại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">
                {row.gender && getGender(row.gender)}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomerTable;
