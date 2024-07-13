import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Modal from "components/modal/modal";
import { useState } from "react";
import { useDeleteFilterMutation } from "redux/api/catalog/filter";
import { IFilter } from "share/types/filter";
import FilterForm from "./FilterForm";
import MUIConfirmDialog, { IContentConfirm } from "components/confirm-dialog/MUIConfirmDialog";

interface FilterTableProps {
  rows: IFilter[];
  refetch?: any;
}

const FilterTable = ({ rows, refetch }: FilterTableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateFilter, setUpdateFilter] = useState<IFilter | undefined>(
    undefined
  );

  const [filterRemove, setFilterRemove] = useState<IContentConfirm | undefined>();

  const [deleteFilter] = useDeleteFilterMutation();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFilterRemove = (data?: IContentConfirm) => {
    setFilterRemove(data);
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
              <TableCell>Nhóm danh mục</TableCell>
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
                  {row.filterName}
                </TableCell>
                <TableCell>{row.categoryGroupName}</TableCell>
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
                    {row.values.join(", ")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <div className="flex gap-4 justify-end">
                    <Button
                      onClick={() => {
                        setIsOpen(true);
                        setUpdateFilter(row);
                      }}
                      variant="contained"
                      color="info"
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      onClick={async () => {
                        handleFilterRemove({
                          id: row.id,
                          title: `Bạn có muốn xoá bộ lọc ${row.filterName}`,
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
        data={filterRemove}
        setData={handleFilterRemove}
        handleConfirm={() => {
          if (filterRemove) {
            deleteFilter(filterRemove.id);
            handleFilterRemove();
          }
        }}
      />
      {isOpen && (
        <Modal onClose={handleClose}>
          <FilterForm filter={updateFilter} onClose={() => setIsOpen(false)} refetch={refetch}/>
        </Modal>
      )}
    </>
  );
};

export default FilterTable;
