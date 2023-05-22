import ZipcodeCalculator from "../../domain/gateway/ZipcodeCalculator";

export default class ZipcodeCalculatorAPIMemory implements ZipcodeCalculator {
  calculate(zipcodeA: string, zipcodeB: string): number {
    return 1000;
  }
}
