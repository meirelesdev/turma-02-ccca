export default class Coupon {
  constructor(public code: string, public percentage: number, public expireDate: Date) {}
  isExpired(): boolean {
    const today = new Date();
    return this.expireDate.getTime() < today.getTime();
  }
}
