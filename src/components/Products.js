import {useState, useEffect } from 'react'

const Products = (props)=>{


	console.log('Products Rendered')
	
	// let [Cart,setCart] = useState(props.Cart)
	let Cart = props.Cart
	let [Products, setProducts] = useState([]);

	useEffect(()=>{
		fetch('http://localhost:3001/products')
		.then(res=>res.json())
		.then((result)=>{
			setProducts(result.products)
		})
	}, [])

	const updateCart = (e)=>{
		let id = e.target.getAttribute('pr-id')
		let prInfo = Products[id]
		let productPrice = prInfo.price
		let productname = prInfo.name
		if(!Cart[id]) {
			Cart[id] = {
				name:productname,
				quantity:1,
				price:productPrice
			}
			props.onCartUpdate(Cart)
		} else {
			let qty_in_cart = Cart[id].quantity
			let updated_qty = qty_in_cart + 1;
			let updated_price = updated_qty * productPrice
			Cart[id] = {
				name:productname,
				quantity:updated_qty,
				price:updated_price
			}
			props.onCartUpdate(Cart)
		}
	}

	return (
		<div className="products-container">

			<div className="product product-header">
				<p className="product-checkbox"></p>
				<p className="product-image">Image</p>
				<p className="product-name">Name</p>
				<p className="product-price">Price</p>
				<p className="product-actions">Action</p>
			</div>
			{
				Products.map((val,ind,arr)=>{
					return <div className="product" key={val.product_id}>
							<p className="product-checkbox">
								<input type="checkbox" />
							</p>
							<p className="product-image">
								<img src={val.image_link} />
							</p>
							<p className="product-name">
								<span>{val.name}</span>
							</p>
							<p className="product-price">
								<span>{val.price}</span>
							</p>
							<p className="product-actions">
								<button onClick={updateCart}  pr-id={ind}>Add To Cart</button>
							</p>
						</div>
				})
			}
		</div>
	)
}

export default Products