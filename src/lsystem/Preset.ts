import PlantModel from "./PlantModel";

export default class Preset {
  static FRACTAL_PLANT: PlantModel = {
    name: "Barnsley Fern",
    axiom: "X",
    rules: [
      { from: "X", to: " F+[[X]-X]-F[-LX]+FL" },
      { from: "F", to: "FF" }
    ]
  };
}
