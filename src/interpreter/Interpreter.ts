import { LineCap } from "konva/lib/Shape";
import Canvas from "../canvas/Canvas";
import PlantModel from "../lsystem/PlantModel";
import { getRandomBetween, getRandomInt, shouldDo } from "../utils/RandomUtils";
import sleep from "../utils/Sleep";

export default class Interpreter {
  constructor(private canvas: Canvas, private plant: PlantModel) {}

  private readonly INIT_STATE = {
    x: this.canvas.getWidth() / 2,
    y: this.canvas.getHeight(),
    angle: 0,
    stemLength: this.plant.stemLength,
    stemWidth: this.plant.stemWidth
  };

  private currentState: DrawState = this.INIT_STATE;

  private readonly stateStack: DrawState[] = [];

  interpret = (expression: string) => {
    for (let i = 0; i < expression.length; i++) {
      const command = expression.charAt(i);
      this.execute(command);
    }
  };

  interpretStepwise = async (expression: string) => {
    for (let i = 0; i < expression.length; i++) {
      const command = expression.charAt(i);
      this.execute(command);
      await sleep(1);
    }
  };

  private execute = (command: string) => {
    switch (command) {
      case "G":
      case "F": {
        if (!shouldDo(this.plant.stemDrawChance)) {
          break;
        }
      }
      case "T": {
        this.drawLine(
          this.plant.stemColor,
          this.currentState.stemLength,
          this.currentState.stemWidth,
          "round"
        );
        break;
      }
      case "+": {
        this.rotate(
          getRandomBetween(
            this.plant.angle - this.plant.angleDerivation,
            this.plant.angle + this.plant.angleDerivation
          )
        );
        break;
      }
      case "-": {
        this.rotate(
          -getRandomBetween(
            this.plant.angle - this.plant.angleDerivation,
            this.plant.angle + this.plant.angleDerivation
          )
        );
        break;
      }
      case "[": {
        this.currentState.stemWidth *= this.plant.stemWidthReductionRatio;
        if (this.currentState.stemWidth < 1) {
          this.currentState.stemWidth = 1;
        }
        if (shouldDo(this.plant.stemLengthReductionChance)) {
          this.currentState.stemLength *= this.plant.stemLengthReductionRatio;
        }
        if (this.currentState.stemLength < 1) {
          this.currentState.stemLength = 1;
        }
        this.pushState();
        break;
      }
      case "]": {
        this.popState();
        break;
      }
      case "L": {
        this.drawLine(
          this.getLeafColor(),
          this.plant.leafLength,
          this.plant.leafWidth
        );
        break;
      }
    }
  };

  private getLeafColor = (): string => {
    const leafColors = this.plant.leafColors;
    return leafColors[getRandomInt(leafColors.length)];
  };

  private drawLine = (
    color: string,
    length: number,
    width: number = 1,
    lineCap: LineCap = "butt"
  ) => {
    const startX = this.currentState.x;
    const startY = this.currentState.y;
    const currentAngle = this.currentState.angle;
    const endX = startX - length * Math.sin((Math.PI * currentAngle) / 180);
    const endY = startY - length * Math.cos((Math.PI * currentAngle) / 180);
    this.canvas.drawLine(startX, startY, endX, endY, color, width, lineCap);
    this.currentState.x = endX;
    this.currentState.y = endY;
  };

  private rotate = (angle: number) => {
    this.currentState.angle += angle;
  };

  private pushState = () => {
    this.stateStack.push({ ...this.currentState });
  };

  private popState = () => {
    const popState = this.stateStack.pop();
    if (popState) {
      this.currentState = popState;
    }
  };
}

interface DrawState {
  x: number;
  y: number;
  angle: number;
  stemLength: number;
  stemWidth: number;
}
