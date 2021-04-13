import React from 'react'
import classNames from 'classnames'
import axios from 'axios';

import './list.scss'
import removeBtn from '../../assets/img/remove.svg';
import Badge from '../Badge/Badge'

const List = ({items, onClick, isRemovable, onRemove, onClickItem, active}) => {

  const removeList = (item) => {
    if(window.confirm("Вы действительно хотите удалить задачу?")) {
      axios.delete(`http://localhost:3001/lists/${item.id}`).then(() => {
        onRemove(item.id)
      })
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {
        items.map((item, index) => (
        <li  
          key={index} 
          className={classNames(item.className, {'active': item.active ? item.active : active && active.id === item.id})}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              onClick={() => removeList(item)} 
              className="list__remove-btn" 
              src={removeBtn} 
              alt="remove btn"
            />
          )}
        </li>))
      }
    </ul>
  )
}

export default List;