import { Button, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { IReport } from "share/types/report";

import {
  useApproveReportMutation,
  useCancelReportMutation,
  useInspectReportMutation,
} from "redux/api/warehouse/report";

interface IInventoryReportProps {
  rows: IReport[];
}

const InventoryReportTable = ({ rows }: IInventoryReportProps) => {
  console.log("🚀 ~ rows:", rows);

  const [approveReport] = useApproveReportMutation();
  const [cancelReport] = useCancelReportMutation();
  const [inspectReport] = useInspectReportMutation();
  const navigate = useNavigate();

  const getDate = (date: string) => {
    if (date === "") {
      return "-";
    }

    const time = new Date(date);

    return (
      time.getDate().toString() +
      "/" +
      time.getMonth().toString() +
      "/" +
      +time.getFullYear().toString()
    );
  };

  const getActionButton = (status: string, id: string) => {
    if (status === "Creative") {
      return (
        <Button
          sx={{ width: 100, fontSize: 14 }}
          color="success"
          variant="contained"
          onClick={() => approveReport(id)}
        >
          Xác nhận
        </Button>
      );
    } else if (status === "Approved") {
      return (
        <Button
          sx={{ width: 100, fontSize: 14 }}
          color="success"
          variant="contained"
          onClick={() => inspectReport(id)}
        >
          Kiểm tra
        </Button>
      );
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "GoodsReceiptReport":
        return (
          <Chip
            sx={{ width: 150, fontSize: 14 }}
            color="success"
            label="Phiếu nhập hàng"
            variant="outlined"
          />
        );
      case "GoodsIssueReport":
        return (
          <Chip
            sx={{ width: 150, fontSize: 14 }}
            color="info"
            label="Phiếu xuất hàng"
            variant="outlined"
          />
        );
      case "Cancelled":
        return (
          <Chip
            sx={{ width: 100, fontSize: 14 }}
            color="error"
            label="Đã hủy"
            variant="filled"
          />
        );
      case "Approved":
        return (
          <Chip
            sx={{ width: 100, fontSize: 14 }}
            color="primary"
            label="Đã xác nhận"
            variant="filled"
          />
        );
      case "Inspected":
        return (
          <Chip
            sx={{ width: 100, fontSize: 14 }}
            color="success"
            label="Đã kiểm tra"
            variant="filled"
          />
        );
      case "Creative":
      default:
        return (
          <Chip
            sx={{ width: 100, fontSize: 14 }}
            variant="outlined"
            color="success"
            label="Mới"
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
              <TableCell align="center">Tên phiếu</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Ngày hoàn tất</TableCell>
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
                <TableCell align="center" component="th" scope="row">
                  {getStatus(row.reportType)}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {row.description}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {getStatus(row.reportStatus)}
                </TableCell>
                <TableCell align="center">{getDate(row.createAt)}</TableCell>
                <TableCell align="center">{getDate(row.inspectAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-4 justify-end">
                    {getActionButton(row.reportStatus, row.id)}
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate(`/admin/inventory-report/${row.id}`)
                      }
                    >
                      Chi tiết
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div></div>
    </>
  );
};

export default InventoryReportTable;
