import React, { useRef } from "react";
import "./Card.css";

function Card({ card, list, deleteCard, cardTitleChange }) {
  const todoCard = useRef();

  //delete todo card
  function handleDeleteCard(e) {
    deleteCard(card.id);
  }
  function handleTodoChange(e) {
    cardTitleChange(card.id, list.id, e.target.value);
  }
  return (
    <div className="card_container">
      <textarea
        type="text"
        ref={todoCard}
        value={card.title}
        onChange={handleTodoChange}
      />
      <button onClick={handleDeleteCard}>-</button>
    </div>
  );
}

export default Card;
