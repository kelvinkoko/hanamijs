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
  private canvas: Canvas | undefined;
  private plant: PlantModel | undefined;

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div
            className={styles.refreshButton}
            onClick={() => {
              if (this.canvas && this.plant) {
                this.draw(this.canvas, this.plant);
              }
            }}
          >
            🌸 生成する
          </div>
        </div>
        <div id="canvas" />
      </div>
    );
  }

  componentDidMount() {
    this.canvas = new Canvas("canvas", 600, 500);
    this.plant = Preset.SAKURA;
    this.draw(this.canvas, this.plant);
  }

  private draw(canvas: Canvas, model: PlantModel) {
    canvas.clear();
    const expression = this.generateExpression(
      model.axiom,
      model.rules,
      model.defaultIteration
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
