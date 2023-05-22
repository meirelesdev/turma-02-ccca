import Coupon from "../../../domain/entity/Coupon";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Database from "../../database/Database";

export default class OrderRepositoryDatabase implements OrderRepository {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async save(order: Order): Promise<void> {
    const orderData = await this.database.one(
      "INSERT INTO ccca.order (coupon_code, code, cpf, issue_date, freight, serial) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [order.coupon?.code, order.code, order.cpf, order.issueDate, order.freight, order.sequence]
    );
    for (const orderItem of order.orderItems) {
      await this.database.one(
        "INSERT INTO ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)",
        [orderData.id, orderItem.itemId, orderItem.price, orderItem.quantity]
      );
    }
  }

  async getByCode(code: string): Promise<Order> {
    const orderData = await this.database.one("SELECT * FROM ccca.order WHERE code = $1", [code]);
    const orderItemsData = await this.database.many(
      "SELECT * FROM ccca.order_item WHERE id_order = $1",
      [orderData.id]
    );
    const order = new Order(
      orderItemsData.cpf,
      new Date(orderItemsData.issue_data),
      orderData.serial
    );
    for (const orderItemdata of orderItemsData) {
      order.addItem(orderItemdata.id_item, parseFloat(orderItemdata.price), orderItemdata.quantity);
    }
    if (orderData.coupon_code) {
      const couponData = await this.database.one("SELECT * FROM ccca.coupon WHERE code = $1", [
        orderData.coupon_code,
      ]);
      const coupon = new Coupon(
        couponData.code,
        couponData.percentage,
        new Date(couponData.expire_date)
      );
      order.addCoupon(coupon);
    }
    order.freight = parseFloat(orderData.freight);
    return order;
  }

  async count(): Promise<number> {
    const countData = await this.database.one("SELECT count(*)::int FROM ccca.order", []);
    return countData.count;
  }
}
