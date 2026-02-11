import React from 'react'
import './Header.css'

const Header = () => {
  const handleViewMenu = () => {
    const menuSection = document.getElementById('explore-menu')
    if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your <br/> favorite food here</h2>
        <p>Select from a wide variety of delicious meals and get them delivered to your doorstep. </p>
        <button onClick={handleViewMenu}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
