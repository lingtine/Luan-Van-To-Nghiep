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
import { useDeleteCategoryMutation } from "redux/api/catalog/category";
import { ICategory } from "share/types/category";
import ModalUpdateCategory from "../modal-update-category";
import { toast } from "react-toastify";
import MUIConfirmDialog from "components/confirm-dialog/MUIConfirmDialog";

interface ICategoryTableProps {
  rows: ICategory[];
}

const CategoryTable = ({ rows }: ICategoryTableProps) => {
  const [remove, resultRemove] = useDeleteCategoryMutation();
  const [categoryRemove, setCategoryRemove] = useState<IContentConfirm>();
  const [categoryUpdate, setCategoryUpdate] = useState<ICategory>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const handleToggle = (data?: ICategory) => {
    setCategoryUpdate(data);
  };
  const handleCategoryGroupRemove = (data?: IContentConfirm) => {
    setCategoryRemove(data);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell component="th" scope="row">
                Tên danh mục
              </TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
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
                <TableCell align="right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={() => {
                        handleToggle(row);
                      }}
                      variant="contained"
                      color="info"
                    >
                      Chỉnh sửa
                    </Button>

                    <Button
                      onClick={() => {
                        handleCategoryGroupRemove({
                          id: row.id,
                          title: `Bạn có muốn xoá danh mục ${row.name}`,
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
        data={categoryRemove}
        setData={handleCategoryGroupRemove}
        handleConfirm={() => {
          if (categoryRemove) {
            remove(categoryRemove.id);
            handleCategoryGroupRemove();
          }
        }}
      />
      {categoryUpdate && (
        <ModalUpdateCategory data={categoryUpdate} onToggle={handleToggle} />
      )}
    </div>
  );
};

export default CategoryTable;
