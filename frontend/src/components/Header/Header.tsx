import './header.css';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import NavModal from '../NavModal/NavModal';

function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header>
        <h1>MiddagsSnurran</h1>
        <button aria-label='navModal' type='button' className='squareBtn header-nav' onClick={() => setNavOpen(true)}>
          <FaBars/>
        </button>
        <NavModal open={navOpen} onClose={() => setNavOpen(false)} /> 
    </header>
  )
}

export default Header