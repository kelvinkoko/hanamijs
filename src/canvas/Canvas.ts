import { Layer } from "konva/lib/Layer";
import { Line } from "konva/lib/shapes/Line";
import { Stage } from "konva/lib/Stage";

export default class Canvas {
  private readonly layer: Layer;

  constructor(canvasContainerId: string) {
    this.layer = this.setupKonvaLayer(canvasContainerId);
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    width: number
  ) {
    var redLine = new Line({
      points: [x1, y1, x2, y2],
      stroke: color,
      strokeWidth: width
    });
    this.layer.add(redLine);
  }

  private setupKonvaLayer = (containerId: string): Layer => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = new Stage({
      container: containerId,
      width: width,
      height: height
    });
    const layer = new Layer();
    stage.add(layer);
    return layer;
  };
}
