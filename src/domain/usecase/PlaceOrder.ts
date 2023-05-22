import Coupon from "../entity/Coupon";
import CouponRepository from "../repository/CouponRepository";
import FreightCalculator from "../service/FreightCalculator";
import Item from "../entity/Item";
import ItemRepository from "../repository/ItemRepository";
import Order from "../entity/Order";
import OrderRepository from "../repository/OrderRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import ZipcodeCalculator from "../gateway/ZipcodeCalculator";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
  constructor(
    public couponRepository: CouponRepository,
    public itemRepository: ItemRepository,
    public orderRepository: OrderRepository,
    public zipcodeCalculator: ZipcodeCalculator
  ) {}
  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.issueDate, sequence);
    const distance = this.zipcodeCalculator.calculate(input.zipcode, "22.222-22");
    for (const inputOrderItem of input.items) {
      const item = await this.itemRepository.getById(inputOrderItem.id);
      if (!item) throw new Error("Item not found");
      order.addItem(item.id, item.price, inputOrderItem.quantity);
      order.freight += FreightCalculator.calculate(distance, item) * inputOrderItem.quantity;
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    await this.orderRepository.save(order);
    return new PlaceOrderOutput({
      code: order.code,
      total,
      freight: order.freight,
    });
  }
}
