import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'
import Products from './Products'
import Checkout from './Checkout'
import CRA from './CRA'
import {useState} from 'react'


function NavBar() {

	let [Cart,setCart] = useState({})


	return(
		<Router>
			<nav className="navbar">
				<div className="title">
					<NavLink to="/" className={({ isActive }) => 
                      (isActive ? "active-class" : "")}>
						SHOPHERE
					</NavLink>
				</div>
				<div className="navLinks">
					<NavLink to="products" className={({ isActive }) => 
                      (isActive ? "active-class" : "")}>
						Products
					</NavLink>
					<NavLink to="checkout" className={({ isActive }) => 
                      (isActive ? "active-class" : "")}>
						Checkout
					</NavLink>

					<NavLink to="CRA" className={({ isActive }) => 
                      (isActive ? "active-class" : "")}>
						CRA
					</NavLink>
				</div>
			</nav>
			<Routes>
				<Route path="/" element={<Products Cart={Cart} onCartUpdate={setCart} />} />
				<Route path="/products" element={<Products Cart={Cart} onCartUpdate={setCart} />} />
				<Route path="/checkout" element={<Checkout Cart={Cart} onCartUpdate={setCart} />} />
				<Route path="/CRA" element={<CRA/>} />
			</Routes>
		</Router>
	)
}

export default NavBar