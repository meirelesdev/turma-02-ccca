type OrderItemOutput = {
  description: string;
  price: number;
  quantity: number;
};
export default class GetOrderOutput {
  code: string;
  items: OrderItemOutput[];
  total: number;
  freight: number;
  constructor({
    code,
    items,
    freight,
    total,
  }: {
    code: string;
    items: OrderItemOutput[];
    freight: number;
    total: number;
  }) {
    this.code = code;
    this.items = items;
    this.total = total;
    this.freight = freight;
  }
}
