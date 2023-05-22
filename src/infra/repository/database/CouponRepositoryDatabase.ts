import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Database from "../../database/Database";

export default class CouponRepositoryDatabase implements CouponRepository {
  database: Database;
  constructor(database: Database) {
    this.database = database;
  }
  async getByCode(code: string): Promise<Coupon | undefined> {
    return this.database.one("SELECT * FROM ccca.coupon WHERE code = $1", [code]);
  }
}
