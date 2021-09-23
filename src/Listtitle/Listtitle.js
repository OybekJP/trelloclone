import React, { useState } from "react";

export default function Listtitle({ listTitleChange, list }) {
  const [newTitle, setTitle] = useState(false);

  function handleListTitleToggle() {
    setTitle(!newTitle);
  }

  //handle the change of the lists title when the list title is clicked and loses focus 
  const handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    const listTitleSpan = document.getElementById("listTitleSpan").innerText;
    listTitleChange(listTitleSpan, list.id);

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        // You can invoke a callback or add custom logic here
        handleListTitleToggle();
      }
    }, 0);
  };

  let listTitleToggle = "";
  if (newTitle === true) {
    listTitleToggle = (
      <span
        contentEditable="true"
        id="listTitleSpan"
        role="textbox"
        className="listTitle listEdit"
        // onChange={handleListTitleChange}
        onBlur={handleBlur}
      >
        {list.title}
      </span>
    );
  } else {
    listTitleToggle = (
      <span
        contentEditable="false"
        className="listTitle listNotEdit"
        onClick={handleListTitleToggle}
      >
        {list.title}
      </span>
    );
  }

  return <p>{listTitleToggle}</p>;
}
