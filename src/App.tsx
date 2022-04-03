import * as React from "react";
import { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styles from "./App.module.css";
import Canvas from "./canvas/Canvas";
import Interpreter from "./interpreter/Interpreter";
import LSystem from "./lsystem/LSystem";
import PlantModel from "./lsystem/PlantModel";
import Preset from "./lsystem/Preset";
import Rule from "./lsystem/Rule";

const App = () => {
  const PLANT: PlantModel = Preset.SAKURA;
  const CANVAS_CONTAINER_ID = "canvas";
  let canvas: Canvas | undefined;

  useEffect(() => {
    canvas = new Canvas(CANVAS_CONTAINER_ID, 600, 500);
    draw(canvas, PLANT);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.refreshButton}
          onClick={() => {
            if (canvas) {
              draw(canvas, PLANT);
            }
          }}
        >
          🌸 生成する
        </div>
      </div>
      <div className={styles.canvas} id={CANVAS_CONTAINER_ID} />
    </div>
  );
};

const draw = (canvas: Canvas, model: PlantModel) => {
  canvas.clear();
  const expression = generateExpression(
    model.axiom,
    model.rules,
    model.defaultIteration
  );
  const interpreter = new Interpreter(canvas);
  interpreter.interpret(expression);
};

const generateExpression = (
  axiom: string,
  rules: Rule[],
  iteration: number
): string => {
  const lSystem = new LSystem();
  let expression = axiom;
  for (let i = 0; i < iteration; i++) {
    expression = lSystem.applyRules(expression, rules);
  }
  return expression;
};

export default hot(App);
