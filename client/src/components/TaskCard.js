import React from 'react';
import deleteIcon from '../assets/delete.png';
import nextIcon from '../assets/next.png';

export default function TaskCard(props) {
  const task = props.task
  const category = props.category
  const name = () => {
    return task.User.name.toUpperCase()
  }
  const date = () => {
    return task.createdAt.slice(0,10)
  }

  return (
    <div className="cardSize taskCard">
      <div className="title">{task.title}</div>
      <div className="detail">{name()}</div>
      <div className="detail">{date()}</div>
      {category !== 'completed' ? 
      <div className="button-container position">
        <img src={deleteIcon} alt={"delete icon"} />
        <img src={nextIcon} alt={"next icon"} />
      </div> : 
      <img className="position" src={deleteIcon} alt={"delete icon"} />}
    </div>
  )
}