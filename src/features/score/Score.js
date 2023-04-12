import React from "react";
import { useSelector } from "react-redux";
import { selectMatchedIDs } from "../board/boardSlice";

export const Score = () => {
  const cardsMatched = useSelector(selectMatchedIDs);

  return (
    // implement selected data inside <div>
    <div className="score-container">Matched: {cardsMatched.length}</div>
  );
};
