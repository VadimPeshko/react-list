import React from 'react'

import './header.scss'

function Header() {
  return (
    <div className="header">
      <input type="checkbox" id="switch" />
      <label htmlFor="switch">Toggle</label>
    </div>
  )
}

export default Header;
