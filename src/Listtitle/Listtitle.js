import React, { useState } from "react";
import uuidv4 from "uuid/dist/v4";

export default function Listtitle({ listTitleChange, list }) {
  const [newTitle, setTitle] = useState(list.title);

  function handleListTitleChange(e) {
    const listTitleId = [e.target.value, list.id];
    //title state in app.js won't update without this
    setTitle(e.target.value);
    listTitleChange(e.target.value, list.id);
    // console.log(listTitleId);
    // console.log(e.target.value);
    // listTitleChange(e.target.value, list.id);
  }

  return (
    <input
      type="text"
      placeholder="enter title"
      onChange={handleListTitleChange}
      //TASK: access listname from data in App later
      value={list.title}
      key={list.id}
    />
  );
}
