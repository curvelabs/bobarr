import styled from 'styled-components';

export const NavbarStyles = styled.div`
  background: ${({ theme }) => theme.colors.navbarBackground};
  color: #fff;
  height: ${({ theme }) => theme.navbarHeight}px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;

  .wrapper {
    align-items: center;
    display: flex;
    height: 100%;
    margin-left: 48px;
    margin-right: 48px;
  }

  .logo {
    font-family: monospace;
    font-size: 2.8em;
    font-weight: bold;
    margin-right: 72px;
    text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.8);
  }

  .links {
    display: flex;

    a {
      border: 1px solid transparent;
      border-radius: 2px;
      color: #fff;
      cursor: pointer;
      display: block;
      margin-right: 24px;
      padding: 3px 5px;
      text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.8);
      text-decoration: none;
      transition: 0.1s linear;

      &.active,
      &:hover {
        border-color: #fff;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .region-select {
    align-items: center;
    border-radius: 2px;
    border: 1px solid #fff;
    cursor: pointer;
    display: flex;
    font-size: 0.9em;
    justify-items: center;
    margin-left: auto;
    padding: 3px 5px;
    transition: 0.1s linear;

    &:hover {
      background: #fff;
      color: ${({ theme }) => theme.colors.navbarBackground};
    }
  }

  .hamburger {
    display: none;
    cursor: pointer;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    margin-left: auto;
    padding: 5px;
    padding-right: 24px;

    &:focus {
      outline: none;
    }
  }

  .overlay {
    position: fixed;
    top: ${({ theme }) => theme.navbarHeight}px;
    left: 0;
    width: 100%;
    height: calc(100vh - ${({ theme }) => theme.navbarHeight}px);
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    z-index: 999;

    &.open {
      opacity: 1;
      visibility: visible;
    }
  }

  .mobile-menu {
    display: none;
    flex-direction: column;
    position: fixed;
    top: ${({ theme }) => theme.navbarHeight}px;
    right: 0;
    width: 66%;
    height: calc(100vh - ${({ theme }) => theme.navbarHeight}px);
    background: ${({ theme }) => theme.colors.navbarBackground};
    padding: 16px;
    overflow-y: auto;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);

    a {
      color: #fff;
      margin-bottom: 16px;
      font-size: 1.2em;
      text-decoration: none;
      padding: 8px 12px;
      border-radius: 4px;

      &:hover, &.active {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .region-select {
      margin-top: auto;
      align-self: center;
      margin-bottom: 30px;
    }

    &.open {
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    .wrapper {
      margin: 0 16px;
      justify-content: space-between;
      width: 100%;
    }

    .logo {
      font-size: 2em;
      margin-right: 0;
    }

    .links,
    .wrapper .region-select {
      display: none;
    }

    .hamburger {
      display: block;
      z-index: 1001;
    }

    .mobile-menu {
      display: flex;
      box-shadow: none;
    }
  }
`;
