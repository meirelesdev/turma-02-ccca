import PlaceOrder from "../../domain/usecase/PlaceOrder";
import ZipcodeCalculatorAPIMemory from "../../infra/service/ZipcodeCalculatorAPIMemory";
import CouponRepositoryMemory from "../../infra/repository/memory/CouponRepositoryMemory";
import OrderRepositoryMemory from "../../infra/repository/memory/OrderRepositoryMemory";
import PgPromiseDatabase from "../../infra/database/PgPromiseDatabase";
import ItemRepositoryMemory from "../../infra/repository/memory/ItemRepositoryMemory";
import ItemRepositoryDatabase from "../../infra/repository/database/ItemRepositoryDatabase";

let placeOrder: PlaceOrder;
describe("Place order tests", () => {
  beforeEach(() => {
    // const itemRepository = new ItemRepositoryMemory();
    const itemRepository = new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
    const couponRepository = new CouponRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    placeOrder = new PlaceOrder(
      couponRepository,
      itemRepository,
      orderRepository,
      new ZipcodeCalculatorAPIMemory()
    );
  });
  test("Deve fazer um pedido", async () => {
    const input = {
      cpf: "151.033.710-57",
      zipcode: "11.111-11",
      items: [
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
      ],
      issueDate: new Date(),
      coupon: "VALE20",
    };

    const order = await placeOrder.execute(input);
    expect(order.total).toBe(5982);
  });

  test("Não deve aplicar desconto no pedido se o cupom está expirado.", async () => {
    const input = {
      cpf: "151.033.710-57",
      zipcode: "11.111-11",
      items: [
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
      ],
      issueDate: new Date(),
      coupon: "VALE20_EXPIRED",
    };
    const order = await placeOrder.execute(input);
    expect(order.total).toBe(7400);
  });

  test("Deve faze um pedico com cálculo de frete.", async () => {
    const input = {
      cpf: "151.033.710-57",
      zipcode: "11.111-11",
      items: [
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
      ],
      issueDate: new Date(),
      coupon: "VALE20_EXPIRED",
    };
    const order = await placeOrder.execute(input);
    expect(order.freight).toBe(310);
  });

  test("Deve faze um pedido com codigo.", async () => {
    const input = {
      cpf: "151.033.710-57",
      zipcode: "11.111-11",
      items: [
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
      ],
      issueDate: new Date("2020-10-01"),
      coupon: "VALE20_EXPIRED",
    };
    const order = await placeOrder.execute(input);
    expect(order.code).toBe("202000000001");
  });
});
