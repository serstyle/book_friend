import React from 'react';

const Navbar = () =>{
	return (
		 <nav>
		    <div className="nav-wrapper teal">
		      <a href="#" className="brand-logo">Book Friends</a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li><a href="badges.html">Sign In</a></li>
		        <li><a href="collapsible.html">Sign Up</a></li>
		      </ul>
		    </div>
		  </nav>
		)
}

export default Navbar