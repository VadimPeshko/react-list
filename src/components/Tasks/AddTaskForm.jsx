import React, { useState } from 'react';
import axios from 'axios';

import addBtn from '../../assets/img/add.svg';

const AddTaskForm = ({list, onAddTasks}) => {

  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTasks = () => {

    if(!inputValue) {
      return
    }

    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    }
    setLoading(true)
    axios.post('http://localhost:3001/tasks', obj).then(({data}) => {
      onAddTasks(list.id, data);
      toggleFormVisible();
    }).catch(() => {
      alert('Невозможно добавить задачу!');
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-add">
          <img src={addBtn} alt="Добавить задачу" />
          <span>Новая задача</span>
        </div>
        ) : (
        <div className="tasks__form-block">
        <input
          value={inputValue} 
          className="field" 
          type="text" 
          placeholder="Введите название"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          disabled={isLoading}
          onClick={addTasks} 
          className="button" 
          type="button"
        > { isLoading ? 'Добавление...' : 'Добавить задачу' }
        </button>
        <button
          onClick={toggleFormVisible} 
          className="button button--grey" 
          type="button"
        > Отмена
        </button>
      </div>
      )
    }
    </div>
  )
}

export default AddTaskForm
