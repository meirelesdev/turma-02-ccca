import CheckCoupon from "./CheckCoupon";

test("Deve retornar um erro ao verificiar que um cupom é invalido", async () => {
  const checkCoupon = new CheckCoupon();
  const coupon = "VALE20_EXPIRED";
  await expect(() => checkCoupon.execute(coupon)).rejects.toThrow(new Error("Coupon invalid"));
});

test("Deve retornar um true ao verificiar que um cupom é valido", async () => {
  const checkCoupon = new CheckCoupon();
  const coupon = "VALE20";
  const result = await checkCoupon.execute(coupon);
  expect(result).toBe(true);
});
