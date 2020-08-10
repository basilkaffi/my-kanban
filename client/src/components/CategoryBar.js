import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import addIcon from '../assets/plus.png';
import close from '../assets/close.png'

export default function CategoryBar(props) {
  const category = props.category
  const tasks = useSelector(state => state.crudReducer.items)
  const [showForm, setShow] = useState(false)
  
  return (
    <div className="categoryBar">
      <div className="header">
        <h5>{category.toUpperCase()}</h5>
        <img src={addIcon} alt={"add icon"} onClick={() => setShow(true)} />
      </div>
      <div className="card-container">
        {
          showForm ? <div className="cardSize addForm">
            <img src={close} onClick={() => setShow(false)} />
            <input type="text" placeholder="Insert Task Title..." />
            <input className="addButton" type="submit" value="ADD" />
          </div> : null}
        {
          tasks.map(task => task.category === category ? <TaskCard task = {task}/>: null
        ) }
      </div>
    </div>
  )
}