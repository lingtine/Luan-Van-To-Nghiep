import React, { useEffect } from "react";
import { IDeliveryInfo } from "redux/api/types";
import { useRemoveDeliveryInfoMutation } from "redux/api/auth/customer-api";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
interface TableDeliveryInfoProps {
  data: IDeliveryInfo[];
}

const TableDeliveryInfo: React.FC<TableDeliveryInfoProps> = ({ data }) => {
  const [removeDeliveryInfo, { isSuccess }] = useRemoveDeliveryInfoMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [isSuccess]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên người nhận</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>
                {row.address.number +
                  " " +
                  row.address.street +
                  " " +
                  row.address.ward +
                  " " +
                  row.address.district +
                  " " +
                  row.address.city}
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    removeDeliveryInfo(row.id);
                  }}
                >
                  Xoá
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDeliveryInfo;
