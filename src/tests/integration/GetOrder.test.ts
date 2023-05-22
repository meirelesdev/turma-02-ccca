import PlaceOrder from "../../domain/usecase/PlaceOrder";
import GetOrder from "../../domain/usecase/GetOrder";
import CouponRepositoryMemory from "../../infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../infra/repository/memory/OrderRepositoryMemory";
import ZipcodeCalculatorAPIMemory from "../../infra/service/ZipcodeCalculatorAPIMemory";
import PgPromiseDatabase from "../../infra/database/PgPromiseDatabase";
import ItemRepositoryDatabase from "../../infra/repository/database/ItemRepositoryDatabase";

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
describe("Get order tests", () => {
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
    getOrder = new GetOrder(couponRepository, itemRepository, orderRepository);
  });
  test("Deve consultar um pedigo pelo codigo", async () => {
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

    const orderCreated = await placeOrder.execute(input);
    const orderOutput = await getOrder.execute(orderCreated.code);

    // expect(orderOutput.items.length).toBe(input.items.length);
  });
});
