import React from "react";
import { useState } from "react";
import deleteIcon from "../assets/delete.png";
import nextIcon from "../assets/next.png";
import editIcon from "../assets/edit.png";
import close from "../assets/close.png";

export default function TaskCard(props) {
  const [edit, setEdit] = useState(false);
  const task = props.task;
  const category = props.category;
  const name = () => {
    return task.User.name.toUpperCase();
  };
  const date = () => {
    return task.createdAt.slice(0, 10);
  };

  return !edit ? (
    <div className="cardSize taskCard">
      <div className="detail">{name()}</div>
      <div className="detail">{date()}</div>
      <div className="title">{task.title}</div>
      {category !== "completed" ? (
        <div className="button-container">
          <img src={deleteIcon} alt={"delete icon"} />
          <img src={editIcon} alt={"edit icon"} onClick={() => setEdit(true)} />
          <img src={nextIcon} alt={"next icon"} />
        </div>
      ) : (
        <div className="button-container dua">
          <img src={deleteIcon} alt={"delete icon"} />
          <img src={editIcon} alt={"edit icon"} onClick={() => setEdit(true)} />
        </div>
      )}
    </div>
  ) : (
    <div className="cardSize addForm">
      <img src={close} onClick={() => setEdit(false)} />
      <input type="text" value={task.title} />
      <input className="addButton" type="submit" value="UPDATE" />
    </div>
  );
}
