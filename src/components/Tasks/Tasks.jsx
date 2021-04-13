import React from 'react';
import axios from 'axios';

import './tasks.scss';
import editBtn from '../../assets/img/edit.svg';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import { Link } from 'react-router-dom';

const Tasks = ({list, onEditTitle, onAddTasks, onRemoveTask, onEditTask, onCompleteTask}) => {

  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if(newTitle) {
      onEditTitle(list.id, newTitle);
      axios.patch(`http://localhost:3001/lists/${list.id}`, {
        name: newTitle
      }).catch(() => {
        alert(`Не удалось изменить название списка!`);
      })
    }
  }
  
  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`} >
        <h2 style={{color: list.color.hex}} className="tasks__title">
          {list.name}
          <img
            onClick={editTitle} 
            src={editBtn} 
            alt="edit btn" 
          />
        </h2>
      </Link>
      <div className="tasks__items">
        {list.tasks && list.tasks && !list.tasks.length && <h2>Нет задач</h2>}
        {
          list.tasks && list.tasks.map(item => (
            <Task 
              key={item.id} 
              {...item} 
              list={list} 
              onRemove={onRemoveTask} 
              onEdit={onEditTask}
              onComplete={onCompleteTask}
            />
          ))
        }
      </div>
      <AddTaskForm key={list.id} list={list} onAddTasks={onAddTasks} />
    </div>
  )
}

export default Tasks
