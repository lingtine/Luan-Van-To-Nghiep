export interface IStock {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  isReceipt: boolean;
}

export interface IStockInput {
  id?: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  isReceipt: boolean;
}
