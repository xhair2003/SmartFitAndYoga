import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  return (
    <nav className='nav'>
      <div className="nav-logo"> <img src={'/logo.png'} alt="logo" className="nav-logo-img" /></div>
      <ul className="nav-menu">
        <li><Link to="/create">Create plans</Link></li>
        <li><Link to="/">Workout</Link></li>
        <li><Link to="/plans">Plans</Link></li>
        <li><Link to="/process tracking">Process tracking</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login" className='nav-start' >Start</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
