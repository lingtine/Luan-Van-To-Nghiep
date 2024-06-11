export interface IGoodsIssue {
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

export interface IGoodsIssueInput {
  name: string;
  description: string;
  supplierId: string;
  warehouseId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
