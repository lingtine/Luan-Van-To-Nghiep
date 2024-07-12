import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ICoupon } from "share/types/coupon";
import { formatVND } from "utils/formatVND";
import { Button, Typography } from "@mui/material";
import { useRemoveCouponMutation } from "redux/api/discount/coupon";
import { useEffect, useState } from "react";
import { IContentConfirm } from "components/confirm-dialog/MUIConfirmDialog";
import { toast } from "react-toastify";
import ModalUpdateCoupon from "../modal-update-coupon";

interface ICouponTableProps {
  rows: ICoupon[];
}

const CouponTable = ({ rows }: ICouponTableProps) => {
  const [remove, resultRemove] = useRemoveCouponMutation();
  const [couponRemove, setCouponRemove] = useState<IContentConfirm>();
  const [couponUpdate, setCouponUpdate] = useState<ICoupon>();
  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const handleToggleUpdate = (data?: ICoupon) => {
    setCouponUpdate(data);
  };
  const handleCouponRemove = (data?: IContentConfirm) => {
    setCouponRemove(data);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên phiếu giảm giá</TableCell>
              <TableCell>Tiền giảm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{formatVND(row.reducedPrice)}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
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
                <TableCell>
                  <div className="flex gap-4 justify-end">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleToggleUpdate(row);
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleCouponRemove({
                          id: row.id,
                          title: `Bạn có muốn xoá sự kiện ${row.name}`,
                          content:
                            "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                        });
                      }}
                      color="error"
                    >
                      Xóa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {couponUpdate && (
        <ModalUpdateCoupon data={couponUpdate} onToggle={handleToggleUpdate} />
      )}
    </>
  );
};

export default CouponTable;
