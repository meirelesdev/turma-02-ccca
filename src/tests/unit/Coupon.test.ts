import Coupon from "../../domain/entity/Coupon";

test("Deve verifica se o cupom esta expirado", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2020-10-10"));
  expect(coupon.isExpired()).toBe(true);
});
