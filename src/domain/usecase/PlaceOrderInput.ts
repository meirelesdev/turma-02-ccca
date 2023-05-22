export default class PlaceOrderInput {
  cpf: string;
  items: any[];
  coupon: string | undefined;
  issueDate: Date;
  zipcode: any;
  constructor({
    cpf,
    zipcode,
    issueDate,
    items,
    coupon,
  }: {
    cpf: string;
    zipcode: string;
    issueDate: Date;
    items: any[];
    coupon?: string;
  }) {
    this.cpf = cpf;
    this.zipcode = zipcode;
    this.issueDate = issueDate;
    this.items = items;
    this.coupon = coupon;
  }
}
