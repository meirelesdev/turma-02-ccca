export default class OrderItem {
  constructor(public itemId: string, public price: number, public quantity: number) {}
  getTotal() {
    return this.price * this.quantity;
  }
}
