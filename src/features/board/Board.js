import React from "react";
import { CardRow } from "./cardRow/CardRow.js";
import { useSelector } from "react-redux";
import { selectBoard } from "./boardSlice";

export const Board = () => {
  const currentBoard = useSelector(selectBoard);
  const numberOfCards = currentBoard.length;
  const columns = 3;
  const rows = Math.floor(numberOfCards / columns);

  const getRowCards = (row) => {
    const rowCards = [];
    for (let j = 0; j < columns; j++) {
      const cardIndex = row * columns + j;
      // row=0: 0 1 2
      // row=1: 3 4 5
      // row=2: 6 7 8
      // row=3: 9 10 11
      rowCards.push(currentBoard[cardIndex]);
    }
    return rowCards;
  };

  // render a group of cardRow components to represent a grid of cards
  // row => iteratively create a board layout
  let content = [];
  for (let row = 0; row < rows; row++) {
    const rowCards = getRowCards(row); // getRowCards() returns an array of card objects
    content.push(<CardRow key={row} cards={rowCards} />); // example: 3 columns, 12 cards => 4 rows
  }
  return <div className="cards-container">{content}</div>;
};
