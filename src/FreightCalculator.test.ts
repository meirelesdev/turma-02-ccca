import FreightCalculator from "./FreightCalculator";
import Item from "./Item";

test("Deve calcular o frete do Guitarra", () => {
  const item = new Item("1", "Guitarra", 1000, 100, 50, 15, 3);
  const distance = 1000;
  const price = FreightCalculator.calculate(distance, item);
  expect(price).toBe(30);
});

test("Deve calcular o frete da Amplificador", () => {
  const item = new Item("2", "Amplificador", 5000, 50, 50, 50, 22);
  const distance = 1000;
  const price = FreightCalculator.calculate(distance, item);
  expect(price).toBe(220);
});

test("Deve calcular o frete da Cabo", () => {
  const item = new Item("3", "Cabo", 30, 9, 9, 9, 0.3);
  const distance = 1000;
  const price = FreightCalculator.calculate(distance, item);
  expect(price).toBe(10);
});
