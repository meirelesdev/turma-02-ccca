import OrderItem from "./OrderItem";
import Cpf from "./Cpf";
import Coupon from "./Coupon";

export default class Order {
  #cpf: Cpf;
  orderItems: OrderItem[];
  coupon?: Coupon;

  constructor(cpf: string) {
    this.#cpf = new Cpf(cpf);
    this.orderItems = [];
  }
  get cpf(): string {
    return this.#cpf.value;
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  addItem(orderItem: OrderItem) {
    this.orderItems.push(orderItem);
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= (total * this.coupon.percentage) / 100;
    }
    return total;
  }
}
