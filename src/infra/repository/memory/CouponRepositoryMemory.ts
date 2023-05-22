import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];
  constructor() {
    this.coupons = [
      new Coupon("VALE20", 20, new Date("2023-05-25")),
      new Coupon("VALE20_EXPIRED", 20, new Date("2022-05-25")),
    ];
  }
  async getByCode(code: string): Promise<Coupon | undefined> {
    return this.coupons.find((c) => c.code === code);
  }
}
