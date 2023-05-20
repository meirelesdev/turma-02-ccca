export default class OrderItem {
  quantity: number;
  description: string;
  price: number;
  constructor(description: string, price: number, quantity: number) {
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
  getTotal() {
    return this.price * this.quantity;
  }
}
