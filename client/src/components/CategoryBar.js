import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import addIcon from "../assets/plus.png";
import close from "../assets/close.png";
import { addItem } from "../store/actions/crudAction";

export default function CategoryBar(props) {
  const category = props.category;
  const tasks = useSelector((state) => state.crudReducer.items);
  const [showForm, setShow] = useState(false);
  const [task, setTask] = useState("");
  const dispatch = useDispatch()

  const addTask = () => {
    dispatch(addItem({
      title: task,
      category: category
    }))
    .then(() => {
      setShow(false)
    })
  }

  return (
    <div className="categoryBar">
      <div className="header">
        <h5>{category.toUpperCase()}</h5>
        <img src={addIcon} alt={"add icon"} onClick={() => setShow(true)} />
      </div>
      <div className="card-container">
        {showForm ? (
          <div className="cardSize cardForm">
            <img
              src={close}
              alt={"close icon"}
              onClick={() => setShow(false)}
            />
            <input
              type="text"
              placeholder="Insert Task Title..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input
              className="button"
              type="submit"
              value="ADD"
              onClick={addTask}
            />
          </div>
        ) : null}
        {tasks.map((task) =>
          task.category === category ? (
            <TaskCard task={task} key={task.id} />
          ) : null
        )}
      </div>
    </div>
  );
}
