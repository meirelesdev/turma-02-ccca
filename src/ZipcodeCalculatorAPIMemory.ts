import ZipcodeCalculator from "./ZipcodeCalculator";

export default class ZipcodeCalculatorAPIMemory implements ZipcodeCalculator {
  calculate(zipcodeA: string, zipcodeB: string): number {
    return 1000;
  }
}
