import React, { useState, useEffect } from "react";
import "./App.css";
import List from "../List/List";
import uuidv4 from "uuid/dist/v4";
import store from "../utils/store";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

//key for saving data in local storage
const LOCAL_STORAGE_KEY = "trellodata";

function App() {
  const [data, setData] = useState(store);

  //get data from users local storage/browser
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (data) setData(data);
  }, []);

  //save data in users local storage/browser
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  });

  //change the title of the list
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

  //change the title of the card
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

  //add new card to existing lists
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
        //eventhough we copied all lists including one we want to update, our updated list will override it because of the nature of objects.
        [listId]: updatedList,
      },
    };
    setData(newState);
  }

  //crete new list
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

  //delete one of the existing lists
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

  //delete once of the cards in existing lists
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

  //Darag and drop logoc. Persist reordering of cards and columns during drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

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

    //logic for the case when lists are being moved to a new destination
    if (type === "list") {
      const newListOrder = Array.from(data.listIds);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        listIds: newListOrder,
      };
      setData(newState);
      return;
    }

    const start = data.lists[source.droppableId];
    const finish = data.lists[destination.droppableId];

    //logic for the case when card ends up in the same list
    if (start === finish) {
      const newCardsOrder = Array.from(start.cards);
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
        ...start,
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
      return;
    }

    //logic for case when cards move from one list to another
    const startCardsOrder = Array.from(start.cards);
    startCardsOrder.splice(source.index, 1);
    const newStart = {
      ...start,
      cards: startCardsOrder,
    };

    const finishCardsOrder = Array.from(finish.cards);
    finishCardsOrder.splice(
      destination.index,
      0,
      data.lists[source.droppableId].cards[source.index]
    );
    const newFinish = {
      ...finish,
      cards: finishCardsOrder,
    };

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <nav className="header">
          <i class="fab fa-trello"></i>
          <h1>Trello clone</h1>
        </nav>
        <Droppable droppableId="all-columns" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="listContainer"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.listIds.map((listId, listIndex) => {
                const list = data.lists[listId];
                return (
                  <>
                    <List
                      list={list}
                      listIndex={listIndex}
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
