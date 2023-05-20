import PlaceOrder from "./PlaceOrder";

test("Deve fazer um pedido", () => {
  const input = {
    cpf: "151.033.710-57",
    zipcode: "11.111-11",
    items: [
      { id: "1", quantity: 2 },
      { id: "2", quantity: 1 },
      { id: "3", quantity: 3 },
    ],
    coupon: "VALE20",
  };
  const placeOrder = new PlaceOrder();
  const order = placeOrder.execute(input);
  expect(order.total).toBe(5982);
});

test("Não deve aplicar desconto no pedido se o cupom está expirado.", () => {
  const input = {
    cpf: "151.033.710-57",
    zipcode: "11.111-11",
    items: [
      { id: "1", quantity: 2 },
      { id: "2", quantity: 1 },
      { id: "3", quantity: 3 },
    ],
    coupon: "VALE20_EXPIRED",
  };

  const placeOrder = new PlaceOrder();
  const order = placeOrder.execute(input);
  expect(order.total).toBe(7400);
});

test("Deve faze um pedico com cálculo de frete.", () => {
  const input = {
    cpf: "151.033.710-57",
    zipcode: "11.111-11",
    items: [
      { id: "1", quantity: 2 },
      { id: "2", quantity: 1 },
      { id: "3", quantity: 3 },
    ],
    coupon: "VALE20_EXPIRED",
  };

  const placeOrder = new PlaceOrder();
  const order = placeOrder.execute(input);
  expect(order.freight).toBe(310);
});
