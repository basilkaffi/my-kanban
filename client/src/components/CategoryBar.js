import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import addIcon from "../assets/plus.png";
import close from "../assets/close.png";
import { addItem } from "../store/actions/crudAction";
import io from "socket.io-client";

export default function CategoryBar(props) {
  const socket = io.connect("https://kanban-h8-server.herokuapp.com");
  const category = props.category;
  const items = useSelector((state) => state.crudReducer.items);
  const [showForm, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTasks(items)
  },[items])

  useEffect(() => {
    socket.on("updateChange", (data) => {
      setTasks(data.items);
    });
  }, []);

  const addTask = () => {
    dispatch(
      addItem({
        title: task,
        category: category,
      })
    ).then(() => {
      setShow(false);
      setTask("")
    });
  };

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
        {tasks.length > 0
          ? tasks.map((task) =>
              task.category === category ? (
                <TaskCard task={task} key={task.id} />
              ) : null
            )
          : null}
      </div>
    </div>
  );
}
