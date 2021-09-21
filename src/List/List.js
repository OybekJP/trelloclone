import React, { useState, useEffect } from "react";
import "./List.css";
import Card from "../Card/Card";
import Listtitle from "../Listtitle/Listtitle";
import StoreApi from "../utils/storeApi";
import uuidv4 from "uuid/dist/v4";
import { Droppable, Draggable } from "react-beautiful-dnd";

function List({
  list,
  listIndex,
  localKey,
  addMoreCard,
  listTitleChange,
  deleteCard,
  deleteList,
  cardTitleChange,
}) {
  //save the state of toggle to add new card
  const [addCard, setAddCard] = useState(false);

  //add new card
  function handleAddMoreCard() {
    let cardSpan = document.getElementById("cardSpan").innerText;
    //stop function if no input is made
    if (cardSpan === "") return;
    addMoreCard(list.id, cardSpan);
    // newTodoName.current.value = "";
    setAddCard(!addCard);
  }

  //delete list
  function handleDeleteList() {
    deleteList(list.id);
  }

  //set the state to toggle the add card part
  function handleAddCardToggle() {
    setAddCard(!addCard);
  }

  let addCardToggle;
  if (addCard === true) {
    addCardToggle = (
      <>
        <span
          contentEditable
          rows="3"
          className="textarea addCardSpan"
          id="cardSpan"
          // onBlur={handleAddCardToggle} causing problem: cancel addmorecard method
        ></span>
        <button className="saveNewCard" onClick={handleAddMoreCard}>
          Add Card
        </button>
        <i onClick={handleAddCardToggle} class="fas fa-times"></i>
      </>
    );
  } else {
    addCardToggle = (
      <>
        <button className="addCardlistBtn" onClick={handleAddCardToggle}>
          + Add a card
        </button>
      </>
    );
  }

  return (
    <Draggable draggableId={list.id} index={listIndex}>
      {(provided) => (
        <div className="list_wrap" {...provided.draggableProps} ref={provided.innerRef}>
          <div className="list_content">
            <div className="listTitleContainer" {...provided.dragHandleProps}>
              <Listtitle listTitleChange={listTitleChange} list={list} />
              {/* <button onClick={handleDeleteList}>-</button> */}
              <i
                onClick={handleDeleteList}
                class="deleteIcon fas fa-minus-square"
              ></i>
              <p className="numOfCards">
                {list.cards.length}{" "}
                {list.cards.length === 1 ? " card" : " cards"}
              </p>
            </div>
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <div
                  className="todoItems"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {list.cards.map((card, index) => {
                    return (
                      <Card
                        key={card.id}
                        card={card}
                        index={index}
                        list={list}
                        deleteCard={deleteCard}
                        cardTitleChange={cardTitleChange}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div>{addCardToggle}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default List;
