import {useState, useEffect} from 'react'
const CRA = (props) =>{
	const [ todos, setTodos ] = useState([]) 

	useEffect(()=>{
		fetch('https://jsonplaceholder.typicode.com/todos')
		.then(res=>res.json())
		.then((result)=>{

			setTodos(result)
		})
	}, [])
	return(
		<div>
		{
			todos && todos.map((todo)=>{
				return <span>{todo.title }</span>
			})
		}
		</div>
	)
}

export default CRA