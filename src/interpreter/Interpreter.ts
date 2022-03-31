import Canvas from "../canvas/Canvas";

export default class Interpreter {
  constructor(private canvas: Canvas) {}

  private readonly LINE_LENGTH = 50;
  private readonly ROTATE_ANGLE = 15;

  private currentState: CursorState = {
    x: 200,
    y: 300,
    angle: 0
  };

  interpret = (expression: string) => {
    for (let i = 0; i < expression.length; i++) {
      const command = expression.charAt(i);
      this.execute(command);
    }
  };

  private execute = (command: string) => {
    switch (command) {
      case "F": {
        this.moveForward();
        break;
      }
      case "+": {
        this.rotate(this.ROTATE_ANGLE);
        break;
      }
      case "-": {
        this.rotate(-this.ROTATE_ANGLE);
        break;
      }
    }
  };

  private moveForward = () => {
    const startX = this.currentState.x;
    const startY = this.currentState.y;
    const currentAngle = this.currentState.angle;
    const endX =
      startX - this.LINE_LENGTH * Math.sin((Math.PI * currentAngle) / 180);
    const endY =
      startY - this.LINE_LENGTH * Math.cos((Math.PI * currentAngle) / 180);
    this.canvas.drawLine(startX, startY, endX, endY);
    this.currentState.x = endX;
    this.currentState.y = endY;
  };

  private rotate = (angle: number) => {
    this.currentState.angle += angle;
  };
}

interface CursorState {
  x: number;
  y: number;
  angle: number;
}
