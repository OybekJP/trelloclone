import React, { useRef, useState } from "react";
import "./Card.css";
import { Draggable } from "react-beautiful-dnd";

function Card({ card, index, list, deleteCard, cardTitleChange }) {
  const [cards, setCard] = useState(false);
  const todoCard = useRef();

  function handleCardToggle() {
    setCard(!cards);
  }

  let cardToggle;
  //toggle the card element to a draggable span and editable span on condition
  if (cards === true) {
    cardToggle = (
      <>
        <span
          contentEditable="true"
          id="cardTitleSpan"
          ref={todoCard}
          className="textarea"
          onBlur={handleCardTitleChange}
          // onChange={handleCardTitleChange}
        >
          {card.title}
        </span>
        <button className="saveEdit" onClick={handleCardTitleChange}>
          Save
        </button>
        <button className="deleteCard" onClick={handleDeleteCard}>
          Delete Card
        </button>
      </>
    );
  } else {
    cardToggle = (
      <>
        <span className="textarea">{card.title}</span>
        <i onClick={handleCardToggle} class="fas fa-pen"></i>
      </>
    );
  }

  //delete todo card
  function handleDeleteCard() {
    deleteCard(card.id, list.id);
  }
  //handle the cards title change
  function handleCardTitleChange(e) {
    const cardTitleSpan = document.getElementById("cardTitleSpan").innerText;
    cardTitleChange(card.id, list.id, cardTitleSpan);
    handleCardToggle();
  }
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="card_container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging
        >
          {cardToggle}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
