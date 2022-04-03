import { LineCap } from "konva/lib/Shape";
import Canvas from "../canvas/Canvas";
import { getRandomBetween, getRandomInt, shouldDo } from "../utils/RandomUtils";

export default class Interpreter {
  constructor(private canvas: Canvas) {}

  private readonly LEAF_COLORS = ["#f5d5f5", "#f5e6f5", "#fff5ff"];
  private readonly ROTATE_ANGLE = 20;
  private readonly ANGLE_DERIVATION = 6;
  private readonly INIT_STATE = {
    x: this.canvas.getWidth() / 2,
    y: this.canvas.getHeight(),
    angle: 0,
    stemLength: 5,
    stemWidth: 20
  };

  private currentState: DrawState = this.INIT_STATE;

  private readonly stateStack: DrawState[] = [];

  interpret = (expression: string) => {
    for (let i = 0; i < expression.length; i++) {
      const command = expression.charAt(i);
      this.execute(command);
    }
  };

  private execute = (command: string) => {
    switch (command) {
      case "G":
      case "F": {
        if (!shouldDo(0.7)) {
          break;
        }
      }
      case "T": {
        this.drawLine(
          "#474a3d",
          this.currentState.stemLength,
          this.currentState.stemWidth,
          "round"
        );
        break;
      }
      case "+": {
        this.rotate(
          getRandomBetween(
            this.ROTATE_ANGLE - this.ANGLE_DERIVATION,
            this.ROTATE_ANGLE + this.ANGLE_DERIVATION
          )
        );
        break;
      }
      case "-": {
        this.rotate(
          -getRandomBetween(
            this.ROTATE_ANGLE - this.ANGLE_DERIVATION,
            this.ROTATE_ANGLE + this.ANGLE_DERIVATION
          )
        );
        break;
      }
      case "[": {
        this.currentState.stemWidth *= 0.75;
        if (this.currentState.stemWidth < 1) {
          this.currentState.stemWidth = 1;
        }
        if (shouldDo(0.6)) {
          this.currentState.stemLength *= 0.9;
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
        this.drawLine(this.getLeafColor(), 8, 8);
        break;
      }
    }
  };

  private getLeafColor = (): string => {
    return this.LEAF_COLORS[getRandomInt(this.LEAF_COLORS.length)];
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
