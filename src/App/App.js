import React, { useState, useEffect, useContext, useRef } from "react";
import "./App.css";
import List from "../List/List";
import uuidv4 from "uuid/dist/v4";
import store from "../utils/store";
import StoreApi from "../utils/storeApi";

function App() {
  const [data, setData] = useState(store);

  function listTitleChange(title, listId) {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    console.timeLog(newState);
  }
  function cardTitleChange(cardId, listId, title) {
    //save index of changed card
    let cardIndex;
    //save cards in the same list
    const cards = data.lists[listId].cards.filter((card, index) => {
      if (card.id === cardId) {
        cardIndex = index;
      }
      return card.id !== cardId;
    });

    const updatedCard = { id: cardId, title: title };
    //add new card to its original index position
    cards.splice(cardIndex, 0, updatedCard);

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: {
          ...data.lists[listId],
          cards: cards,
        },
      },
    };
    setData(newState);
  }
  function addMoreCard(listId, newCardTitle) {
    //make a copy of current data
    const newCardId = uuidv4();
    const newCard = {
      id: newCardId,
      title: newCardTitle,
    };
    const updatedList = data.lists[listId];
    updatedList.cards = [...updatedList.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        //eventhough we copied all lists including one we want to update, our updated list will replace it because of the nature of objects.
        [listId]: updatedList,
      },
    };
    setData(newState);
  }

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

  function deleteList(listId) {
    const newData = data;
    //TASK:delete this direct state modification if local stroage doesnt store it 
    delete newData.lists[listId];
    const newListIds = newData.listIds.filter((id) => id !== listId);
    // console.log(filtered);
    const newState = {
      ...data,
      listIds: newListIds,
    };
    setData(newState);
    console.log(newState);
  }

  function deleteCard(cardId, listId){
    const newCards = data.listsp[listId].cards.filter(card=>card.id !== cardId);

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
                listTitleChange={listTitleChange}
                addMoreCard={addMoreCard}
                deleteCard={deleteCard}
                deleteList={deleteList}
                cardTitleChange={cardTitleChange}
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
