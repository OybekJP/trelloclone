import React, { useRef } from "react";
import "./Card.css";

function Card({ card, deleteTodo, changeTodoName }) {
  const todoCard = useRef();

  //delete todo card
  function handleDeleteTodo(e) {
    deleteTodo(card.id);
  }
  function handleTodoChange(e) {
    const todoIdName = [card.id, e.target.value];
    changeTodoName(todoIdName);
  }
  return (
    <div className="card_container">
      <textarea
        type="text"
        ref={todoCard}
        value={card.title}
        onChange={handleTodoChange}
      />
      <button onClick={handleDeleteTodo}>-</button>
    </div>
  );
}

export default Card;
