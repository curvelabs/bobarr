import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetParamsQuery } from '../../utils/graphql';
import { NavbarStyles } from './navbar.styles';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = [
  ['Movies', '/library/movies'],
  ['TV Shows', '/library/tvshows'],
  ['Search', '/search'],
  ['Discover', '/discover'],
  ['Suggestions', '/suggestions'],
  ['Calendar', '/calendar'],
  ['Settings', '/settings'],
];

export function NavbarComponent() {
  const router = useRouter();
  const { data } = useGetParamsQuery();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <NavbarStyles>
      <div className="wrapper">
        <div className="logo">bobarr</div>
        <div className="links">
          {links.map(([name, url]) => (
            <Link key={url} href={url} passHref={true}>
              <a className={cx({ active: url === router.pathname })}>{name}</a>
            </Link>
          ))}
        </div>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="region-select">{data?.params?.region || 'US'}</div>
      </div>
      
      {/* Overlay that dims the screen and allows clicking outside to close menu */}
      <div 
        className={`overlay ${menuOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      />

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(([name, url]) => (
          <Link key={url} href={url} passHref>
            <a
              className={cx({ active: url === router.pathname })}
              onClick={closeMenu}
            >
              {name}
            </a>
          </Link>
        ))}
        <div
          className="region-select"
          onClick={closeMenu}
        >
          {data?.params?.region || 'US'}
        </div>
      </div>
    </NavbarStyles>
  );
}
