import Item from "./Item";

export default class FreightCalculator {
  static calculate(distance: number, item: Item) {
    const price = distance * item.getVolume() * (item.getDensity() / 100);
    if (price < 10) return 10;
    return price;
  }
}
