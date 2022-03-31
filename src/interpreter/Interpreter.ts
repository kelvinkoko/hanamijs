import Canvas from "../canvas/Canvas";

export default class Interpreter {
  constructor(private canvas: Canvas) {}

  private readonly LINE_LENGTH = 50;

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
    const currentX = this.currentState.x;
    const currentY = this.currentState.y;
    switch (command) {
      case "F": {
        this.canvas.drawLine(
          currentX,
          currentY,
          currentX,
          currentY - this.LINE_LENGTH
        );
        this.currentState.y -= this.LINE_LENGTH;
      }
    }
  };
}

interface CursorState {
  x: number;
  y: number;
  angle: number;
}
