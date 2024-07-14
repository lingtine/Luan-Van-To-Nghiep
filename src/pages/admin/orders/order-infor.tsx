import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { IOrderDetail } from "share/types/order";
import { formatVND } from "utils/formatVND";

interface OrderInfoProps {
  order: IOrderDetail;
}

const OrderInfoDetail: React.FC<OrderInfoProps> = ({ order }) => {
  const createdAt = new Date(order.createAt);

  return (
    <Box>
      <Card sx={{ backgroundColor: "#e3f2fd" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Thông tin đơn hàng
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Người đặt hàng:</strong> {order.deliveryInfo.fullName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Đặt lúc:</strong> {format(createdAt, "p")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Số lượng sản phẩm:</strong> {order.totalItems}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Tổng tiền:</strong> {formatVND(order.amount)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Khuyến mãi:</strong>{" "}
                {formatVND(order.amount - order.cost)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Thành tiền:</strong> {formatVND(order.cost)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderInfoDetail;
