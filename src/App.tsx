import * as React from "react";
import { hot } from "react-hot-loader/root";
import Canvas from "./canvas/Canvas";
import Interpreter from "./interpreter/Interpreter";

class App extends React.Component {
  render() {
    const canvas = new Canvas("canvas");
    const interpreter = new Interpreter(canvas);
    interpreter.interpret("F+F+F-F-F");
    return (
      <>
        <h1>Hello</h1>
      </>
    );
  }
}

export default hot(App);
