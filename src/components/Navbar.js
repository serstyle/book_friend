import React from 'react';
import { Link, withRouter } from 'react-router-dom'

const Navbar = () =>{
	return (
		 <nav>
		    <div className="nav-wrapper teal">
		      <a href="#" className="brand-logo">Book Friends</a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li><Link to='/signin'>Sign In</Link></li>
		        <li><a href="collapsible.html">Sign Up</a></li>
		      </ul>
		    </div>
		  </nav>
		)
}

export default withRouter(Navbar)