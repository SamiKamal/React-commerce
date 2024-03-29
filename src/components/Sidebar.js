import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { connect } from 'react-redux'
import { SIDEBAR_CLOSE } from '../actions'

const Sidebar = ({closeSidebar, isSidebarOpen}) => {
  return (
    <SidebarContainer>
      <aside className={`sidebar ${isSidebarOpen ? 'show-sidebar' : 'hide-sidebar' }`}>
        <div className="sidebar-header">
        <Link to="/"><h1>React <span>Commerce</span>.</h1></Link>
          <button className="close-btn" onClick={closeSidebar}><FaTimes/></button>
        </div>
        <ul className="links">
        {links.map(link => (
          <li key={link.id}><Link to={link.url}>{link.text}</Link></li>
        ))}
        </ul>
        <CartButtons/>
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`

h1{
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--clr-primary-1);
  
  span {
    color: var(--clr-primary-6);
    
  }
}

  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

const mapDispatchToProps = dispatch => {
  return {closeSidebar: () => dispatch({type: SIDEBAR_CLOSE})}
}
const mapStateToProps = ({products}) => {
  return {isSidebarOpen: products.isSidebarOpen}
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
