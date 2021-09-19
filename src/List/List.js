import React, { useState, useEffect, useRef, useContext } from "react";
import "./List.css";
import Card from "../Card/Card";
import Listtitle from "../Listtitle/Listtitle";
import StoreApi from "../utils/storeApi";
import uuidv4 from "uuid/dist/v4";

function List({
  list,
  localKey,
  addMoreCard,
  listTitleChange,
  deleteCard,
  deleteList,
  cardTitleChange,
}) {
  // const [lists, setList] = useState("");

  //get access to JSX element
  const newTodoName = useRef();
  function handleAddMoreCard() {
    let newCardTitle = newTodoName.current.value;
    //stop function if no input is made
    if (newCardTitle === "") return;
    addMoreCard(list.id, newCardTitle);
    newTodoName.current.value = "";
  }

  function handleDeleteList() {
    console.log("clicked list " + list.id);
    deleteList(list.id);
  }

  return (
    <div className="list_wrap">
      <div className="list_content">
        <div className="listTitle">
          <Listtitle listTitleChange={listTitleChange} list={list} />
          <button onClick={handleDeleteList}>-</button>
        </div>
        <div className="todoItems">
          {list.cards &&
            list.cards.map((card) => {
              return (
                <Card
                  key={card.id}
                  card={card}
                  list={list}
                  deleteCard={deleteCard}
                  cardTitleChange={cardTitleChange}
                />
              );
            })}
        </div>
        <div className="addTodo">
          <input type="text" ref={newTodoName} />
          <button onClick={handleAddMoreCard}>ADDCARD</button>
        </div>
      </div>
    </div>
  );
}

export default List;
