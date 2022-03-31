import * as React from "react";
import { hot } from "react-hot-loader/root";
import Canvas from "./canvas/Canvas";

class App extends React.Component {
  render() {
    const canvas = new Canvas("canvas");
    canvas.drawLine(0, 0, 100, 100);
    return (
      <>
        <h1>Hello</h1>
      </>
    );
  }
}

export default hot(App);
