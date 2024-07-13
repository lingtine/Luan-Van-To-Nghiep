import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IWarehouse } from "share/types/warehouse";
import { Button, Typography } from "@mui/material";
import MUIConfirmDialog, {
  IContentConfirm,
} from "components/confirm-dialog/MUIConfirmDialog";
import { useRemoveWarehouseMutation } from "redux/api/warehouse/warehouse";
import { toast } from "react-toastify";
import ModalUpdateWarehouse from "../modal-update-warehouse";

interface IWarehouseTableProps {
  rows: IWarehouse[];
}

const WarehouseTable = ({ rows }: IWarehouseTableProps) => {
  const [remove, resultRemove] = useRemoveWarehouseMutation();
  const [warehouseRemove, setWarehouseRemove] = useState<IContentConfirm>();
  const [warehouseUpdate, setWarehouseUpdate] = useState<IWarehouse>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const handleToggleUpdate = (data?: IWarehouse) => {
    setWarehouseUpdate(data);
  };
  const handleWarehouseRemove = (data?: IContentConfirm) => {
    setWarehouseRemove(data);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell align="center">FAX</TableCell>
              <TableCell align="center">Số Điện thoại</TableCell>
              <TableCell align="center">Email</TableCell>
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
                    {row.address}
                  </Typography>
                </TableCell>
                <TableCell align="center">{row.fax}</TableCell>
                <TableCell align="center">{row.hotLine}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell>
                  <div className="flex gap-4 justify-end">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleToggleUpdate(row);
                      }}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleWarehouseRemove({
                          id: row.id,
                          title: `Bạn có muốn xoá nhóm thương hiệu ${row.name}`,
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
      <MUIConfirmDialog
        data={warehouseRemove}
        setData={handleWarehouseRemove}
        handleConfirm={() => {
          if (warehouseRemove) {
            remove(warehouseRemove.id);
            handleWarehouseRemove();
          }
        }}
      />
      {warehouseUpdate && (
        <ModalUpdateWarehouse
          data={warehouseUpdate}
          onToggle={handleToggleUpdate}
        />
      )}
    </>
  );
};

export default WarehouseTable;
