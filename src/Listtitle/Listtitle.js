import React, {useState} from "react";

export default function Listtitle({listNameChange, list}) {
  const [titles, setTitle] = useState('');

  function handleListChange(e) {
    const listTitleId = [e.target.value, list.id];
    //title state in app.js won't update without this
    setTitle(e.target.value);
    listNameChange(listTitleId);
    // console.log(listTitleId);
  }

  return (
    <input
      type="text"
      placeholder="enter title"
      onChange={handleListChange}
      //TASK: access listname from data in App later
      value={list.title}
      key={list.id}
    />
  );
}
