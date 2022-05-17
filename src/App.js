import React from 'react'
import Todo from './components/Todo'
import Shophere from './components/ShopHere'
import './index.css'

function App(){
	// fetch('http://localhost:3000/api')
	// .then(res => res.json())
 //  	.then(result=>console.log(result))
  return(
  	
    <div>
      <Todo />
    </div>
  )
}

export default App;