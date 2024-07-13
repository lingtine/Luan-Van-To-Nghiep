import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
    ConfirmDialog,
    IContentConfirm,
} from "components/confirm-dialog/confirm-dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteBrandMutation } from "redux/api/catalog/brand";
import { IBrand } from "share/types/brand";
import ModalUpdateBrand from "../modal-update-brand";
import MUIConfirmDialog from "components/confirm-dialog/MUIConfirmDialog";

interface IBrandTableProps {
  rows: IBrand[];
}

const BrandTable = ({ rows }: IBrandTableProps) => {
  const [remove, resultRemove] = useDeleteBrandMutation();
  const [brandRemove, setBrandRemove] = useState<IContentConfirm>();
  const [brandUpdate, setBrandUpdate] = useState<IBrand>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const handleToggleUpdate = (data?: IBrand) => {
    setBrandUpdate(data);
  };
  const handleBrandRemove = (data?: IContentConfirm) => {
    setBrandRemove(data);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">STT</TableCell>
              <TableCell align="left">Hình ảnh</TableCell>
              <TableCell component="th" scope="row">
                Tên thương hiệu
              </TableCell>
              <TableCell align="center">Mô tả</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">
                  <div className="flex gap-4 items-center">
                    <img className="w-16" src={row.imageUrl} alt={row.name} />
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className="max-w-[400px]">
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
                <TableCell align="right">
                  <div className="flex gap-4 justify-end">
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => {
                        handleToggleUpdate(row);
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      onClick={() => {
                        handleBrandRemove({
                          id: row.id,
                          title: `Bạn có muốn xoá thương hiệu ${row.name}`,
                          content:
                            "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                        });
                      }}
                      variant="contained"
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
        data={brandRemove}
        setData={handleBrandRemove}
        handleConfirm={() => {
          if (brandRemove) {
            remove(brandRemove.id);
            handleBrandRemove();
          }
        }}
      />
      {brandUpdate && (
        <ModalUpdateBrand data={brandUpdate} onToggle={handleToggleUpdate} />
      )}
    </div>
  );
};

export default BrandTable;
