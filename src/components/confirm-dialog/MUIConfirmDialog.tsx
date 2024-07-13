import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Button } from "@mui/material";
export interface IContentConfirm {
  id: string;
  title: string;
  content: string;
}
interface IConfirmDialog {
  data?: IContentConfirm;
  setData: (data?: IContentConfirm) => void;
  handleConfirm: () => void;
}

const MUIConfirmDialog = ({ data, setData, handleConfirm }: IConfirmDialog) => {
  return (
    <>
      {data && (
        <Dialog
          open={!!data}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{data?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {data?.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setData();
              }}
              className="mr-1"
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleConfirm();
                setData();
              }}
              color="error"
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default MUIConfirmDialog;
