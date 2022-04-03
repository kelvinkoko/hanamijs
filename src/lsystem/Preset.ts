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
  static SAKURA: PlantModel = {
    name: "桜",
    axiom: "TTTTTTTTTTTT[b][+a]-b",
    rules: [
      { from: "F", to: "GF" },
      { from: "a", to: "F[+xL]+b" },
      { from: "b", to: "F[-yL]-a" },
      { from: "x", to: "+a" },
      { from: "y", to: "-b" }
    ]
  };
}
