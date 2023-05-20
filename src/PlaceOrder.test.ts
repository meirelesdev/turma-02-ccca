import PlaceOrder from "./PlaceOrder";

test("Deve fazer um pedido", () => {
  const input = {
    cpf: "151.033.710-57",
    items: [
      { description: "Guitarra", price: 1000, quantity: 2 },
      { description: "Amplificador", price: 5000, quantity: 1 },
      { description: "Cabo", price: 30, quantity: 3 },
    ],
    coupon: "VALE20",
  };
  const placeOrder = new PlaceOrder();
  const order = placeOrder.execute(input);
  expect(order.total).toBe(5672);
});
