import React from "react";
import { Card } from "./card/Card.js";

export const CardRow = ({ cards }) => {
  // organize each row of cards
  const content = cards.map((card) => (
    <Card key={card.id} id={card.id} contents={card.contents} />
  ));

  return <>{content}</>;
};
