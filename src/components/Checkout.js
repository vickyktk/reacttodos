import { useState } from 'react'

const Checkout = (props)=>{
	console.log('Checkout Rendered')

	let Cart = props.Cart
	// let [Cart,setCart] = useState(props.Cart)

	const removeFromCart = (e)=>{
		let cart_key = e.target.getAttribute('pr-cart-key');
		let conArr = Object.entries(Cart)
		let filtered = conArr.filter((key,val)=>{
			return key[0] != cart_key
		})
		const updatedCart = Object.fromEntries(filtered);

		props.onCartUpdate(updatedCart)
	}

	return (
		<main className="checkout-container">
			<h3 className="page-title">Checkout</h3>
			{
				Object.keys(Cart).length && <div className="cart-wrapper">
				<div className="cart-item">
					<p className="cart-item-remove" >
					</p>
					<p className="cart-item-name">
						Product
					</p>

					<p className="cart-item-qty">
						Quantity
					</p>

					<p className="cart-item-total">
						Subtotal
					</p>
				</div>

				{
					Object.keys(Cart).map((val)=>{
						let product_info = Cart[val];
						return <div className="cart-item" key={val}>
							<p className="cart-item-remove" >
								<span onClick={removeFromCart} pr-cart-key={val}>x</span>
							</p>
							<p className="cart-item-name">
								{product_info.name}
							</p>
							<p className="cart-item-qty">
								{product_info.quantity}
							</p>

							<p className="cart-item-total">
								{product_info.price}
							</p>
						</div>
					})
				}
			</div>	
			}		
		</main>
	)
}

export default Checkout