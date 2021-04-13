import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Badge from '../Badge/Badge';
import List from '../List/List';

import closeBtn from '../../assets/img/close.svg';

import './addListButton.scss'

const AddListButton = ({colors, onAdd}) => {
  
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setColor] = useState(2);
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if(Array.isArray(colors)) setColor(colors[0].id)
  }, [colors]);

  const close = () => {
    setVisiblePopup(false)
    setColor(colors[0].id)
    setInputValue('')
  }

  const addList = () => {
    if(!inputValue) {
      return
    }
    setLoading(true);
    axios.post('http://localhost:3001/lists', {
      name: inputValue,
      colorId: selectedColor
    }).then(({data}) => {
      const color = colors.filter(color => color.id === selectedColor)[0];
      const listObj = {...data, color, tasks: [] };
      onAdd(listObj);
      close();
    }).finally(() => {
      setLoading(false);
    })
  }
  
  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)} 
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить задачу'
          },
        ]} 
      />
      {visiblePopup && (
      <div className="add-list__popup">
        <img 
          onClick={close} 
          className="add-list__popup-close" 
          alt="close" 
          src={closeBtn}/>
        <input 
          className="field" 
          type="text" 
          placeholder="Введите название"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <div className="add-list__popup-colors">
          {
            colors.map(color => (
            <Badge
              onClick={() => setColor(color.id)}
              key={color.id} 
              color={color.name}
              className={selectedColor === color.id && 'active'} 
            />
            ))
          }
        </div>
        <button 
          className="button" 
          type="button"
          onClick={addList}
        > { isLoading ? 'Добавление...' : 'Добавить' } 
        </button>
        </div>)}
      </div>
  )
}

export default AddListButton;
