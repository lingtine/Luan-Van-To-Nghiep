import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MUIConfirmDialog from "components/confirm-dialog/MUIConfirmDialog";
import {
  IContentConfirm
} from "components/confirm-dialog/confirm-dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteSpecificationMutation } from "redux/api/catalog/specification";
import { ISpecification } from "share/types/specification";
import ModalUpdateSpecification from "../modal-update-specification";

interface ISpecificationTableProps {
  rows: ISpecification[];
  refetch?: any;
}

const SpecificationTable = ({ rows, refetch }: ISpecificationTableProps) => {
  const [remove, resultRemove] = useDeleteSpecificationMutation();
  const [specificationRemove, setSpecificationRemove] =
    useState<IContentConfirm>();
  const [specificationUpdate, setSpecificationUpdate] =
    useState<ISpecification>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const handleToggleUpdate = (data?: ISpecification) => {
    if (data) {
      setSpecificationUpdate(data);
    } else {
      setSpecificationUpdate(undefined);
    }
  };
  const handleSpecificationRemove = (data?: IContentConfirm) => {
    setSpecificationRemove(data);
  };

  return (
    <>
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
                <TableCell className="max-w-[300px]">
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
                      onClick={() => {
                        handleToggleUpdate(row);
                      }}
                      variant="contained"
                      color="info"
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      onClick={async () => {
                        handleSpecificationRemove({
                          id: row.id,
                          title: `Bạn có muốn xoá nhóm thống số ${row.name}`,
                          content:
                            "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                        });

                        if (refetch) {
                          refetch();
                        }
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
        data={specificationRemove}
        setData={handleSpecificationRemove}
        handleConfirm={() => {
          if (specificationRemove) {
            remove(specificationRemove.id);
            handleSpecificationRemove(undefined);
          }
        }}
      />
      {specificationUpdate && (
        <ModalUpdateSpecification
          data={specificationUpdate}
          onToggle={handleToggleUpdate}
        />
      )}
    </>
  );
};

export default SpecificationTable;
