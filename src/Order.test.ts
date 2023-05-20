import Coupon from "./Coupon";
import Order from "./Order";
import OrderItem from "./OrderItem";

test("Não deve criar um pedido com CPF invalido", () => {
  const cpf = "111.111.111-11";
  expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido quando o CPF é valido", () => {
  const cpf = "151.033.710-57";
  const order = new Order(cpf);
  expect(order.cpf).toBe(cpf);
});

test("Deve criar um pedido com 3 itens", () => {
  const cpf = "151.033.710-57";
  const order = new Order(cpf);
  order.addItem(new OrderItem("Guitarra", 1000, 2));
  order.addItem(new OrderItem("Amplificador", 5000, 1));
  order.addItem(new OrderItem("Cabo", 30, 3));
  const total = order.getTotal();
  expect(total).toBe(7090);
});

test("Deve criar um pedido com cupom de desconto", () => {
  const cpf = "151.033.710-57";
  const order = new Order(cpf);
  order.addItem(new OrderItem("Guitarra", 1000, 2));
  order.addItem(new OrderItem("Amplificador", 5000, 1));
  order.addItem(new OrderItem("Cabo", 30, 3));
  order.addCoupon(new Coupon("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(5672);
});
