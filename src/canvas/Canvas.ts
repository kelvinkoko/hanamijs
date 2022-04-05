import { Layer } from "konva/lib/Layer";
import { LineCap } from "konva/lib/Shape";
import { Line } from "konva/lib/shapes/Line";
import { Rect } from "konva/lib/shapes/Rect";
import { Stage } from "konva/lib/Stage";

export default class Canvas {
  private readonly stage: Stage;
  private readonly layer: Layer;

  constructor(
    canvasContainerId: string,
    sceneWidth: number,
    sceneHeight: number
  ) {
    this.stage = this.setupKonvaStage(
      canvasContainerId,
      sceneWidth,
      sceneHeight
    );
    this.layer = this.stage.getLayers()[0];
  }

  getWidth(): number {
    return this.layer.getWidth();
  }

  getHeight(): number {
    return this.layer.getHeight();
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    width: number,
    lineCap: LineCap
  ) {
    const line = new Line({
      points: [x1, y1, x2, y2],
      stroke: color,
      strokeWidth: width,
      lineCap: lineCap
    });
    this.layer.add(line);
  }

  private setupKonvaStage = (
    containerId: string,
    width: number,
    height: number
  ): Stage => {
    const stage = new Stage({
      container: containerId,
      width: width,
      height: height
    });
    const layer = new Layer();
    stage.add(layer);
    return stage;
  };

  clear = () => {
    this.layer.destroyChildren();
    const background = new Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: "#fdfcf8",
      listening: false
    });
    this.layer.add(background);
  };
}
