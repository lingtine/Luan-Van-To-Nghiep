import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";

interface InForAddressOrderProps {
  deliveryInfo: any;
}

const InForAddressOrder: React.FC<InForAddressOrderProps> = ({
  deliveryInfo,
}) => {
  return (
    <Box>
      <Card sx={{ backgroundColor: "#e3f2fd" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Thông tin giao hàng
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Tên Người Nhận:</strong> {deliveryInfo.fullName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Số điện thoại:</strong> {deliveryInfo.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                <strong>Email:</strong> {deliveryInfo.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Địa chỉ: </strong>
                {deliveryInfo.address.streetNumber +
                  " " +
                  deliveryInfo.address.street +
                  " " +
                  deliveryInfo.address.ward +
                  " " +
                  deliveryInfo.address.district +
                  " " +
                  deliveryInfo.address.city}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Note:</strong> {deliveryInfo.note}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InForAddressOrder;
