import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ISupplier } from "share/types/supplier";
import { Button } from "@mui/material";
import MUIConfirmDialog, {
  IContentConfirm,
} from "components/confirm-dialog/MUIConfirmDialog";
import ModalUpdateSupplier from "../modal-update-supplier";
import { useRemoveSupplierMutation } from "redux/api/warehouse/supplier";
import { toast } from "react-toastify";

interface ISupplierTableProps {
  rows: ISupplier[];
}

const SupplierTable = ({ rows }: ISupplierTableProps) => {
  const [remove, resultRemove] = useRemoveSupplierMutation();
  const [supplierRemove, setSupplierRemove] = useState<IContentConfirm>();
  const [supplierUpdate, setSupplierUpdate] = useState<ISupplier>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const handleToggleUpdate = (data?: ISupplier) => {
    setSupplierUpdate(data);
  };
  const handleSupplierRemove = (data?: IContentConfirm) => {
    setSupplierRemove(data);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên nhà cung cấp</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
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
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
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
                      color="error"
                      onClick={() => {
                        handleSupplierRemove({
                          id: row.id,
                          title: `Bạn có muốn xoá nhà cung cấp ${row.name}`,
                          content:
                            "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                        });
                      }}
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
        data={supplierRemove}
        setData={handleSupplierRemove}
        handleConfirm={() => {
          if (supplierRemove) {
            remove(supplierRemove.id);
            handleSupplierRemove();
          }
        }}
      />
      {supplierUpdate && (
        <ModalUpdateSupplier
          data={supplierUpdate}
          onToggle={handleToggleUpdate}
        />
      )}
    </>
  );
};

export default SupplierTable;
