import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import GetOrderOutput from "./GetOrderOutput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class GetOrder {
  constructor(
    public couponRepository: CouponRepository,
    public itemRepository: ItemRepository,
    public orderRepository: OrderRepository
  ) {}
  async execute(code: string): Promise<PlaceOrderOutput> {
    const order = await this.orderRepository.getByCode(code);
    const orderItems = [];
    for (const orderItem of order.orderItems) {
      const item = await this.itemRepository.getById(orderItem.itemId);
      if (!item) throw new Error("item not found");
      orderItems.push({
        description: item.description,
        price: orderItem.price,
        quantity: orderItem.quantity,
      });
    }
    return new GetOrderOutput({
      code: order.code,
      items: orderItems,
      freight: order.freight,
      total: order.getTotal(),
    });
  }
}
