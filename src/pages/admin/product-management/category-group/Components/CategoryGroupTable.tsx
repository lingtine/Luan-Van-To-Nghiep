import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useGetCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { ICategoryGroup } from "share/types/category-group";
import ModalUpdateCategoryGroup from "../modal-update-category-group";

const CategoryGroupTable = () => {
  const { data } = useGetCategoryGroupsQuery({});
  const [categoryGroup, setCategoryGroup] = useState<ICategoryGroup>();
  const handleToggle = (data?: ICategoryGroup) => {
    setCategoryGroup(data);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell component="th" scope="row">
                Tên nhóm danh mục
              </TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row, index) => (
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
                  <Button
                    onClick={() => {
                      handleToggle(row);
                    }}
                    variant="contained"
                    color="info"
                  >
                    Chỉnh sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {categoryGroup && (
        <ModalUpdateCategoryGroup
          categoryGroup={categoryGroup}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
};

export default CategoryGroupTable;
