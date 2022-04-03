import * as React from "react";
import { hot } from "react-hot-loader/root";
import styles from "./App.module.css";
import Canvas from "./canvas/Canvas";
import Interpreter from "./interpreter/Interpreter";
import LSystem from "./lsystem/LSystem";
import PlantModel from "./lsystem/PlantModel";
import Preset from "./lsystem/Preset";
import Rule from "./lsystem/Rule";
class App extends React.Component {
  render() {
    const canvas = new Canvas("canvas", 600, 500);
    const plant = Preset.SAKURA;
    this.draw(canvas, plant, plant.defaultIteration);
    return (
      <>
        <div className={styles.header}>
          <div
            className={styles.refreshButton}
            onClick={() => {
              this.draw(canvas, plant, plant.defaultIteration);
            }}
          >
            🌸 生成する
          </div>
        </div>
      </>
    );
  }

  private draw(canvas: Canvas, model: PlantModel, iteration: number) {
    canvas.clear();
    const expression = this.generateExpression(
      model.axiom,
      model.rules,
      iteration
    );
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
