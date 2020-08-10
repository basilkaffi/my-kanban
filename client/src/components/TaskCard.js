import React from 'react';

export default function TaskCard(props) {
  const task = props.task

  return (
    <div className="cardSize">
      {task.title}
    </div>
  )
}