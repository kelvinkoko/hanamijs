import * as React from "react";
import { hot } from "react-hot-loader/root";
import Canvas from "./canvas/Canvas";
import Interpreter from "./interpreter/Interpreter";
import LSystem from "./lsystem/LSystem";
import Rule from "./lsystem/Rule";

class App extends React.Component {
  render() {
    const canvas = new Canvas("canvas");
    this.drawPlant(canvas, 6);
    return (
      <>
        <h1>Hello</h1>
      </>
    );
  }

  private drawPlant(canvas: Canvas, iteration: number) {
    const axiom = "X";
    const rules = [
      { from: "X", to: " F+[[X]-X]-F[-LX]+FL" },
      { from: "F", to: "FF" }
    ];
    const expression = this.generateExpression(axiom, rules, iteration);
    const interpreter = new Interpreter(canvas);
    interpreter.interpret(expression);
  }

  private generateExpression(
    axiom: string,
    rules: Rule[],
    iteration: number
  ): string {
    const lSystem = new LSystem();
    let expression = axiom;
    for (let i = 0; i < iteration; i++) {
      expression = lSystem.applyRules(expression, rules);
    }
    return expression;
  }
}

export default hot(App);
