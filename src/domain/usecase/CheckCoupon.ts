import Coupon from "../entity/Coupon";

export default class CheckCoupon {
  coupons: Coupon[];
  constructor() {
    this.coupons = [
      new Coupon("VALE20", 20, new Date("2024-10-10")),
      new Coupon("VALE20_EXPIRED", 20, new Date("2020-10-10")),
    ];
  }
  async execute(code: string): Promise<boolean> {
    const coupon = this.coupons.find((c) => c.code === code);
    if (!coupon || (coupon && coupon.isExpired())) throw new Error("Coupon invalid");
    return true;
  }
}
