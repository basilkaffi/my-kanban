import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import deleteIcon from "../assets/delete.png";
import nextIcon from "../assets/next.png";
import editIcon from "../assets/edit.png";
import close from "../assets/close.png";
import { editItem, deleteItem } from "../store/actions/crudAction";

export default function TaskCard(props) {
  const task = props.task;
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedCategory, setEditedCategory] = useState(task.category);
  const dispatch = useDispatch();

  const name = () => {
    return task.User.name.toUpperCase();
  };
  const date = () => {
    return task.createdAt.slice(0, 10);
  };

  const nextCategory = () => {
    let updateCategory = null;
    switch (task.category) {
      case "backlog":
        updateCategory = "todo";
        break;
      case "todo":
        updateCategory = "done";
        break;
      case "done":
        updateCategory = "completed";
        break;
      default:
        updateCategory = task.category;
        break;
    }
    const data = {
      id: task.id,
      title: editedTitle,
      category: updateCategory,
    };
    dispatch(editItem(data));
  };

  const updateTask = () => {
    const data = {
      id: task.id,
      title: editedTitle,
      category: editedCategory,
    };
    dispatch(editItem(data)).then(() => {
      setEdit(false);
    })
  };

  const deleteTask = () => {
    dispatch(deleteItem(task.id));
  };

  return !edit ? (
    <div className="cardSize taskCard">
      <div className="detail">{name()}</div>
      <div className="detail">{date()}</div>
      <div className="title">{task.title}</div>
      {task.category !== "completed" ? (
        <div className="button-container">
          <img src={deleteIcon} alt={"delete icon"} onClick={deleteTask} />
          <img src={editIcon} alt={"edit icon"} onClick={() => setEdit(true)} />
          <img src={nextIcon} alt={"next icon"} onClick={nextCategory} />
        </div>
      ) : (
        <div className="button-container dua">
          <img src={deleteIcon} alt={"delete icon"} onClick={deleteTask} />
          <img src={editIcon} alt={"edit icon"} onClick={() => setEdit(true)} />
        </div>
      )}
    </div>
  ) : (
    <div className="cardSize cardForm Edit">
      <img src={close} alt={"close icon"} onClick={() => setEdit(false)} />
      <input
        type="text"
        placeholder="Edit title here..."
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <select onChange={(e) => setEditedCategory(e.target.value)}>
        <option value={editedCategory}>Edit Category...</option>
        {task.category !== "backlog" ? (
          <option value="backlog">Backlog</option>
        ) : null}
        {task.category !== "todo" ? <option value="todo">Todo</option> : null}
        {task.category !== "done" ? <option value="done">Done</option> : null}
        {task.category !== "completed" ? (
          <option value="completed">Completed</option>
        ) : null}
      </select>
      <input
        className="button"
        type="submit"
        value="UPDATE"
        onClick={updateTask}
      />
    </div>
  );
}
