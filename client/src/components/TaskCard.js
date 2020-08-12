import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import deleteIcon from "../assets/delete.png";
import nextIcon from "../assets/next.png";
import editIcon from "../assets/edit.png";
import close from "../assets/close.png";
import { editItem, deleteItem } from "../store/actions/crudAction";
import Swal from "sweetalert2";

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

  const unauthorizedSwal = () => {
    Swal.fire({
      background: "#393e46",
      width: 400,
      html: `<div style="color:#00adb5; font-size:1.5rem; font-weight: 500">
          Unauthorized To Do This Action</div>`,
      icon: "error",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const confirmDelete = (data) => {
    Swal.fire({
        icon: 'warning',
        html: `<div style="color:#00adb5; font-size:1.5rem; font-weight: 500">
            Are You Sure?</div>`,
        background: "#393e46",
        showCancelButton: true,
        confirmButtonColor: '#222831',
        cancelButtonColor: '#00adb5',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.value) {
          dispatch(deleteItem(data))
        }
    })
  }

  const showEditForm = () => {
    localStorage.username === task.User.name
      ? setEdit(true)
      : unauthorizedSwal();
  };

  const checkAuthorization = (type, data) => {
    if (localStorage.username === task.User.name) {
      type === "edit"
        ? dispatch(editItem(data)).then(() => {
            setEdit(false);
          })
        : confirmDelete(data);
    } else {
      unauthorizedSwal();
    }
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
    checkAuthorization("edit", data);
  };

  const updateTask = () => {
    const data = {
      id: task.id,
      title: editedTitle,
      category: editedCategory,
    };
    checkAuthorization("edit", data);
  };

  const deleteTask = () => {
    checkAuthorization("delete", task.id);
  };

  return !edit ? (
    <div className="cardSize taskCard">
      <div className="detail">{name()}</div>
      <div className="detail">{date()}</div>
      <div className="title">{task.title}</div>
      {task.category !== "completed" ? (
        <div className="button-container">
          <img src={deleteIcon} alt={"delete icon"} onClick={deleteTask} />
          <img src={editIcon} alt={"edit icon"} onClick={showEditForm} />
          <img src={nextIcon} alt={"next icon"} onClick={nextCategory} />
        </div>
      ) : (
        <div className="button-container dua">
          <img src={deleteIcon} alt={"delete icon"} onClick={deleteTask} />
          <img src={editIcon} alt={"edit icon"} onClick={showEditForm} />
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
