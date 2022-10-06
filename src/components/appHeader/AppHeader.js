import {Link, NavLink} from "react-router-dom";
import './appHeader.scss';

const AppHeader = () => {

    let activeStyle = {
        color: "red",
      };

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}  to="/">Characters</NavLink></li>
                    /
                    <li><NavLink end style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}  to="/comics">Comics</NavLink></li>
                    <li className="menu__wish-list"><NavLink end style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}  to="/wishlist">Wish list</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;