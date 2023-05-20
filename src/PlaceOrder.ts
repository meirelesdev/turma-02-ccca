import Coupon from "./Coupon";
import Order from "./Order";
import OrderItem from "./OrderItem";

export default class PlaceOrder {
  coupons: Coupon[];
  orders: Order[];
  constructor() {
    this.coupons = [new Coupon("VALE20", 20)];
    this.orders = [];
  }
  execute(input: any) {
    const order = new Order(input.cpf);
    for (const inputOrderItem of input.items) {
      const orderItem = new OrderItem(
        inputOrderItem.description,
        inputOrderItem.price,
        inputOrderItem.quantity
      );
      order.addItem(orderItem);
    }
    if (input.coupon) {
      const coupon = this.coupons.find((coupon) => coupon.description === input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    this.orders.push(order);
    return {
      total,
    };
  }
}
