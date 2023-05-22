import OrderItem from "./OrderItem";
import Cpf from "./valueObject/Cpf";
import Coupon from "./Coupon";
import OrderCode from "./valueObject/OrderCode";

export default class Order {
  #cpf: Cpf;
  #code: OrderCode;
  orderItems: OrderItem[];
  coupon?: Coupon;
  freight: number;
  issueDate: Date;
  sequence: number;

  constructor(cpf: string, issueDate: Date, sequence: number) {
    this.#cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
    this.issueDate = issueDate;
    this.sequence = sequence;
    this.#code = new OrderCode(this.issueDate, this.sequence);
  }

  get cpf(): string {
    return this.#cpf.value;
  }

  get code(): string {
    return this.#code.value;
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
