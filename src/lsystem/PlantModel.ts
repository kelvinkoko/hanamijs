import Rule from "./Rule";

export default interface PlantModel {
  readonly name: string;
  readonly axiom: string;
  readonly rules: Rule[];
  readonly defaultIteration: number;
}
