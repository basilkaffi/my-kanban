import React from 'react';

export default function TaskCard(props) {
  const task = props.task
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
    </div>
  )
}