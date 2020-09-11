import React from "react";
import styles from "./GameBoard.module.css";
import { Score } from "../Score/Score";
let divs = [];
for (let i = 0; i < 16; i++) {
  divs.push({
    value: 0,
  });
}

export class GameBoard extends React.Component {
  state = {
    pieces: divs,
    points: 0,
  };

  componentDidMount() {
    this.generateRandom();
    this.generateRandom();
    document.addEventListener("keyup", this.handleKeyUp);
  }

  generateRandom = () => {
    const tempPieces = this.state.pieces;
    const tempRandom = Math.floor(Math.random() * 16);
    if (tempPieces[tempRandom].value === 0) {
      tempPieces[tempRandom].value = 2;

      this.setState({ pieces: tempPieces });
    } else this.generateRandom();
  };

  handleRow = (type, isFirst) => {
    const tempPieces = this.state.pieces;

    for (let i = 0; i < 16; i += 4) {
      let one = tempPieces[i].value;
      let two = tempPieces[i + 1].value;
      let three = tempPieces[i + 2].value;
      let four = tempPieces[i + 3].value;
      const row = [one, two, three, four];
      let filteredRow = row.filter((num) => num);
      let missing = Array(4 - filteredRow.length).fill(0);

      let newRow = [];

      switch (type) {
        case "Right":
          newRow = missing.concat(filteredRow);
          break;
        case "Left":
          newRow = filteredRow.concat(missing);
          break;

        default:
          break;
      }

      tempPieces[i].value = newRow[0];
      tempPieces[i + 1].value = newRow[1];
      tempPieces[i + 2].value = newRow[2];
      tempPieces[i + 3].value = newRow[3];

      this.setState({ pieces: tempPieces });

      if (isFirst) this.combineNumbers([i, i + 1, i + 2, i + 3], type);
    }
  };

  handleColumn = (type, isFirst) => {
    const tempPieces = this.state.pieces;
    for (let i = 0; i < 4; i++) {
      let one = tempPieces[i].value;
      let two = tempPieces[i + 4 * 1].value;
      let three = tempPieces[i + 4 * 2].value;
      let four = tempPieces[i + 4 * 3].value;
      const column = [one, two, three, four];
      let filteredRow = column.filter((num) => num);
      let missing = Array(4 - filteredRow.length).fill(0);

      let newRow = [];

      switch (type) {
        case "Down":
          newRow = missing.concat(filteredRow);
          break;
        case "Up":
          newRow = filteredRow.concat(missing);
          break;

        default:
          break;
      }

      tempPieces[i].value = newRow[0];
      tempPieces[i + 4 * 1].value = newRow[1];
      tempPieces[i + 4 * 2].value = newRow[2];
      tempPieces[i + 4 * 3].value = newRow[3];

      this.setState({ pieces: tempPieces });

      if (isFirst)
        this.combineNumbers([i, i + 4 * 1, i + 4 * 2, i + 4 * 3], type);
    }
  };

  combineNumbers = (arr, type) => {
    let x, y;

    let { pieces: gameArray, points } = this.state;

    switch (type) {
      case "Right":
      case "Down":
        x = 0;
        y = 1;

        for (let i = 3; i >= 0; i--) {
          if (
            gameArray[arr[i + x]].value === gameArray[arr[i + y]]?.value &&
            gameArray[arr[i + x]].value !== 0
          ) {
            const newNumber =
              gameArray[arr[i + x]].value + gameArray[arr[i + y]].value;
            gameArray[arr[i + y]].value = newNumber;

            points += gameArray[arr[i + x]].value;
            gameArray[arr[i + x]].value = 0;

            if (type === "Right") this.handleRow(type, false);
            else this.handleColumn(type, false);
          }
        }
        break;
      case "Left":
      case "Up":
        x = 1;
        y = 0;
        for (let i = 0; i < 3; i++) {
          if (
            gameArray[arr[i + x]].value === gameArray[arr[i + y]].value &&
            gameArray[arr[i + x]].value !== 0
          ) {
            const newNumber =
              gameArray[arr[i + x]].value + gameArray[arr[i + y]].value;
            gameArray[arr[i + y]].value = newNumber;
            points += gameArray[arr[i + x]].value;
            gameArray[arr[i + x]].value = 0;

            if (type === "Left") this.handleRow(type, false);
            else this.handleColumn(type, false);
          }
        }
        break;

      default:
        break;
    }
    this.setState({ pieces: gameArray, points: points });
  };

  handleKeyUp = (event) => {
    switch (event.key) {
      case "ArrowRight":
        this.handleRow("Right", true);
        this.generateRandom();
        break;
      case "ArrowLeft":
        this.handleRow("Left", true);
        this.generateRandom();
        break;
      case "ArrowDown":
        this.handleColumn("Down", true);
        this.generateRandom();
        break;
      case "ArrowUp":
        this.handleColumn("Up", true);
        this.generateRandom();
        break;
      default:
        break;
    }
  };

  pickColor = (num) => {
    switch (num) {
      case 2:
        return "white";
      case 4:
        return "coral";
      case 8:
        return "cyan";
      case 16:
        return "royalblue";
      case 32:
        return "slateblue";
      case 64:
        return "chocolate";
      case 128:
        return "maroon";
      case 256:
        return "mediumseagreen";
      case 512:
        return "springgreen";
      case 1024:
        return "darkorange";
      case 2048:
        return "hotpink";
      default:
        break;
    }
  };

  render() {
    return (
      <>
        <Score score={this.state.points} />
        <div className={styles.grid}>
          {this.state.pieces.map((piece, index) => (
            <div
              style={{ backgroundColor: this.pickColor(piece.value) }}
              className={styles.piece}
              key={index}
            >
              {piece.value || ""}
            </div>
          ))}
        </div>
      </>
    );
  }
}
