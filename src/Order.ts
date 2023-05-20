import OrderItem from "./OrderItem";
import Cpf from "./Cpf";
import Coupon from "./Coupon";

export default class Order {
  #cpf: Cpf;
  orderItems: OrderItem[];
  coupon?: Coupon;
  freight: number;

  constructor(cpf: string) {
    this.#cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
  }

  get cpf(): string {
    return this.#cpf.value;
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired()) {
      this.coupon = coupon;
    }
  }

  addItem(itemId: string, price: number, quantity: number) {
    this.orderItems.push(new OrderItem(itemId, price, quantity));
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= (total * this.coupon.percentage) / 100;
    }
    total += this.freight;
    return total;
  }
}
