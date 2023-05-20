import Coupon from "./Coupon";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import Order from "./Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import ZipcodeCalculatorAPIMemory from "./ZipcodeCalculatorAPIMemory";

export default class PlaceOrder {
  coupons: Coupon[];
  orders: Order[];
  items: Item[];
  zipcodeCalculator: any;
  constructor() {
    this.coupons = [
      new Coupon("VALE20", 20, new Date("2023-05-25")),
      new Coupon("VALE20_EXPIRED", 20, new Date("2022-05-25")),
    ];
    this.items = [
      new Item("1", "Guitarra", 1000, 100, 50, 15, 3),
      new Item("2", "Amplificador", 5000, 50, 50, 50, 22),
      new Item("3", "Cabo", 30, 10, 10, 10, 1),
    ];
    this.orders = [];
    this.zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
  }
  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const order = new Order(input.cpf);
    const distance = this.zipcodeCalculator.calculate(input.zipcode, "22.222-22");
    for (const inputOrderItem of input.items) {
      const item = this.items.find((item) => item.id === inputOrderItem.id);
      if (!item) throw new Error("Item not found");
      order.addItem(item.id, item.price, inputOrderItem.quantity);
      order.freight += FreightCalculator.calculate(distance, item) * inputOrderItem.quantity;
    }
    if (input.coupon) {
      const coupon = this.coupons.find((coupon) => coupon.description === input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    this.orders.push(order);
    return new PlaceOrderOutput({
      total,
      freight: order.freight,
    });
  }
}
