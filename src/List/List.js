import React, { useState, useEffect, useRef, useContext } from "react";
import "./List.css";
import Card from "../Card/Card";
import Listtitle from "../Listtitle/Listtitle";
import StoreApi from "../utils/storeApi";

function List({ list, localKey, listNameChange, deleteTodo, changeTodoName }) {
  const { addMoreCard } = useContext(StoreApi);

  //get access to JSX element
  const newTodoName = useRef();
  function handleAddMoreTodo() {
    let name = newTodoName.current.value;
    //stop function if no input is made
    if (name === "") return;
    addMoreCard(name);
    newTodoName.current.value = "";
    console.log(name);
  }

  return (
    <div className="list_wrap">
      <div className="list_content">
        <div className="listTitle">
          <Listtitle listNameChange={listNameChange} list={list} />
        </div>
        <div className="todoItems">
          {list.cards &&
            list.cards.map((card) => {
              return (
                <Card
                  key={card.id}
                  card={card}
                  deleteTodo={deleteTodo}
                  changeTodoName={changeTodoName}
                />
              );
            })}
        </div>
        <div className="addTodo">
          <input type="text" ref={newTodoName} />
          <button onClick={handleAddMoreTodo}>ADDCARD</button>
        </div>
      </div>
    </div>
  );
}

export default List;
