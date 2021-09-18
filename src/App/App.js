import React, { useState, useEffect, useContext, useRef } from "react";
import "./App.css";
import List from "../List/List";
import uuidv4 from "uuid/dist/v4";
import store from "../utils/store";
import StoreApi from "../utils/storeApi";

function App() {
  //playlist
  // const [listName, setPlaylist] = useState("");
  //todo items state
  // const [todos, setTodos] = useState([]);
  const [data, setData] = useState(store);

  function listNameChange(listTitleId) {
    const newListTitle = data;
    const id = listTitleId[1];
    //assumes that listobject name and list id are same
    newListTitle.lists[id].title = listTitleId[0];
    // newListTitle.listIds.push(changingList.title);
    setData(newListTitle);
    console.log(data);
  }

  function addMoreCard(newTodoTitle) {
    //TASK: change setState to new data
    //call prevValue property to retreive all previous todos and add new one
    console.log(newTodoTitle);
    const newData = data;
    // const changingList = newListCard.lists[]
    // setTodos((prevTodos) => {
    //   return [
    //     ...prevTodos,
    //     { id: uuidv4(), name: newTodoTitle, complete: false },
    //   ];
    // });
  }

  // //delete todo item
  // function deleteTodo(todoId) {
  //   //TASK: change setState to new data
  //   const todosCopy = [...todos];
  //   const newTodos = todosCopy.filter((todo) => todo.id !== todoId);
  //   setTodos(newTodos);
  // }

  // //change todo items name. receives array with 2 elements, 1st is id, 2nd is name
  // function changeTodoName(todoIdName) {
  //   const newTodos = [...todos];
  //   const changingTodo = newTodos.find((todo) => todo.id === todoIdName[0]);
  //   changingTodo.name = todoIdName[1];
  //   setTodos(newTodos);
  // }

  let newListTitle = useRef();

  function addMoreList() {
    const newListId = uuidv4();
    const newList = {
      id: newListId,
      title: "",
      cards: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
  }

  return (
    <div className="App">
      <nav className="header">
        <i class="fab fa-trello"></i>
        <h1>Trello mini</h1>
      </nav>
      <div className="listContainer">
        {console.log("outsideof map")}
        {data.listIds.map((listId) => {
          const list = data.lists[listId];
          return (
            <>
              <List
                list={list}
                key={listId}
                listNameChange={listNameChange}
                // addMoreTodo={addMoreTodo}
                // deleteTodo={deleteTodo}
                // changeTodoName={changeTodoName}
              />
            </>
          );
        })}

        <div className="list_content">
          <div className="listTitle">
            {/* <input placeholder="+ Add another List"/> */}
          </div>
          <div className="addTodo">
            {/* <input type="text" ref={newListTitle} /> */}
            <button onClick={addMoreList}>+ Add another List</button>
          </div>
        </div>

        {/* <input type="text" placeholder="nana"></input> */}
        {/* <button onClick={addNewList}>+ Add another list</button> */}
      </div>
    </div>
  );
}

export default App;
