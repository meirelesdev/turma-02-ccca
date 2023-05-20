import ZipcodeCalculatorAPI from "./ZipcodeCalculatorAPIMemory";

test("Deve calcular a distância entre dois ceps", () => {
  const zipcodeCalculatorAPI = new ZipcodeCalculatorAPI();
  const zipcodeA = "11.111-11";
  const zipcodeB = "22.222-22";
  const distance = zipcodeCalculatorAPI.calculate(zipcodeA, zipcodeB);
  expect(distance).toBe(1000);
});
