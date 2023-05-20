export default class Coupon {
  description: string;
  percentage: number;
  constructor(description: string, percentage: number) {
    this.description = description;
    this.percentage = percentage;
  }
}
