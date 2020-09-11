import React from "react";
import { GameBoard } from "../GameBoard/GameBoard";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.container}>
      <GameBoard className={styles.grid} />
    </div>
  );
};
