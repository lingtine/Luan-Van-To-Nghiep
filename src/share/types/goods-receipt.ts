export interface IGoodsReceipt {
  id: string;
  name: string;
  description: string;
  supplierId: string;
  warehouseId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
export interface IGoodsReceiptInput {
  name: string;
  description: string;
  supplierId: string;
  warehouseId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
