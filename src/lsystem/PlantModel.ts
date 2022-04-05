import Rule from "./Rule";

export default interface PlantModel {
  readonly name: string;
  readonly axiom: string;
  readonly rules: Rule[];
  readonly iteration: number;
  readonly stemColor: string;
  readonly stemDrawChance: number;
  readonly stemLength: number;
  readonly stemLengthReductionRatio: number;
  readonly stemLengthReductionChance: number;
  readonly stemWidth: number;
  readonly stemWidthReductionRatio: number;
  readonly leafColors: string[];
  readonly leafLength: number;
  readonly leafWidth: number;
  readonly angle: number;
  readonly angleDerivation: number;
}
