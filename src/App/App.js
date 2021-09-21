import React, { useState, useEffect, useContext, useRef } from "react";
import "./App.css";
import List from "../List/List";
import uuidv4 from "uuid/dist/v4";
import store from "../utils/store";
import StoreApi from "../utils/storeApi";
import { DragDropContext } from "react-beautiful-dnd";

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
    setData(newState);
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
    const newState = {
      ...data,
      listIds: newListIds,
    };
    setData(newState);
  }

  function deleteCard(cardId, listId) {
    const newCards = data.lists[listId].cards.filter(
      (card) => card.id !== cardId
    );
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: {
          ...data.lists[listId],
          cards: newCards,
        },
      },
    };
    setData(newState);
  }

  //persist reordering with
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    //exit the reordering if there was no destination
    if (!destination) {
      return;
    }
    //check if the user dropped back to its original position. if so do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const list = data.lists[source.droppableId];
    const newCardsOrder = Array.from(list.cards);
    //remove element from cards array
    newCardsOrder.splice(source.index, 1);
    //access the whole card object being dropped from original source and add to neworder
    newCardsOrder.splice(
      destination.index,
      0,
      data.lists[source.droppableId].cards[source.index]
    );

    //our list with new reordered cards array
    const newList = {
      ...list,
      cards: newCardsOrder,
    };

    //use newList update the state and override with new changes
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [newList.id]: newList,
      },
    };
    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <nav className="header">
          <i class="fab fa-trello"></i>
          <h1>Trello mini</h1>
        </nav>
        <div className="listContainer">
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

          <div>
            <button className="addCardlistBtn" onClick={addMoreList}>
              + Add another list
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
