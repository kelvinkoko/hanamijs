import * as React from "react";
import styles from "./GenerateButton.module.css";

type Props = {
  onClick: () => void;
};

const GenerateButton = ({ onClick }: Props) => {
  return (
    <div className={styles.generateButton} onClick={onClick}>
      🌸 生成する
    </div>
  );
};

export default GenerateButton;
