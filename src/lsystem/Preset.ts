import PlantModel from "./PlantModel";

export default class Preset {
  static FRACTAL_PLANT: PlantModel = {
    name: "Barnsley Fern",
    axiom: "X",
    rules: [
      { from: "X", to: "F+[[X]-X]-F[-FX]+X" },
      { from: "F", to: "FF" }
    ],
    iteration: 6,
    stemColor: "#18870c",
    stemLength: 5,
    stemWidth: 1,
    leafColors: ["#2bb01c", "#21bf0f", "#16a106"],
    leafLength: 5,
    leafWidth: 1,
    angle: 20,
    angleDerivation: 0,
    stemDrawChance: 1,
    stemLengthReductionRatio: 0,
    stemLengthReductionChance: 0,
    stemWidthReductionRatio: 0
  };
  static SAKURA: PlantModel = {
    name: "桜",
    axiom: "TTTTTTTTTTTT[b][+a]-b",
    rules: [
      { from: "F", to: "GF" },
      { from: "a", to: "F[+xL]+b" },
      { from: "b", to: "F[-yL]-a" },
      { from: "x", to: "+a" },
      { from: "y", to: "-b" }
    ],
    iteration: 14,
    stemColor: "#474a3d",
    stemLength: 5,
    stemWidth: 20,
    leafColors: ["#f5d5f5", "#f5e6f5", "#fff5ff"],
    leafLength: 8,
    leafWidth: 8,
    stemDrawChance: 0.7,
    stemLengthReductionRatio: 0.9,
    stemLengthReductionChance: 0.6,
    stemWidthReductionRatio: 0.75,
    angle: 20,
    angleDerivation: 6
  };
}
