
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faTrash , faPlus,faRemove} from '@fortawesome/free-solid-svg-icons'
import './todo.css'



function Notices(props) {
  let notices = props.notices
  function removeNotice(id) {
    let filteredNotices = notices.filter((val,ind)=>{
      return ind != id
    })

    props.onUpdateNotices(filteredNotices)
  }
  return (
    <>
      <div className="extech_notices">
        {
          notices.map((val,ind)=>{
            return <div className={`extech_notice_${val.type}`} key={ind}>
              <p >
                {
                  val.message
                }
              </p>
              <span>
                <FontAwesomeIcon icon={faRemove} onClick={()=>removeNotice(ind)} />
              </span>
            </div>
          })
        }
      </div>
    </>
  )
}

function Todo(props){

  let [todos,setTodos] = useState([{title:"Record Videos", completed:false},{title:"Record2 Videos", completed:true},{title:"Record3 Videos", completed:false}]);
  let [gTodos,setgTodos] = useState(todos);
  let [inputText,setInputText] = useState('');
  let [filter, setFilter] = useState('All');
  const [notices, setNotices] = useState([]);


  let trackInputKeyPress = (e)=>{
    if (13 == e.which) {
      if ('' == inputText) {
        let obj = {
          message:'Please enter some text',
          type:'error'
        }
        setNotices([...notices, obj])
        return
      }

      let obj = {title:inputText, completed:false}
      setTodos([...todos,obj])
      setgTodos([...todos,obj])

      setInputText('')
    }
  };

  let addTodo = ()=>{
    if ('' == inputText) {
      let obj = {
        message:'Please enter some text',
        type:'error'
      }
      setNotices([...notices, obj])
      return
    }

    let obj = {title:inputText, completed:false}
    setTodos([...todos,obj])
    setgTodos([...todos,obj])

    setInputText('')
  }
  let setInputTextVal = (e)=> {
    setInputText(e.target.value)
  };

  let completedChecked = (e)=>{
    let id  = e.target.getAttribute('data-id')
    let filteredTodos = todos.filter((val,ind)=>{
      if (id == ind ) {
        val.completed = !val.completed;
      }
      return val 
    })
    setTodos(filteredTodos)
    setgTodos(todos)

  }
  let deleteTodo =  (id)=>{
    // let id  = e.target.getAttribute('data-id')
    let filteredTodos = todos.filter((val,ind)=>{
      return id != ind
    })

    let obj = {
      message:'Your Todo has been deleted successfully',
      type:'success'
    }
    setNotices([...notices, obj])
    setTodos(filteredTodos)
    setgTodos(todos)

  }

  let filterTheTodos = (val)=>{
    console.log(val)
    if ('all' == val){
      setgTodos(todos)
    }
    if('completed' == val) {
      let  gtTodos = todos.filter(val=>val.completed ===  true)
      setgTodos(gtTodos)

    }
    if('incomplete' == val) {
      let gtTodos = todos.filter(val=>val.completed !==  true)
      setgTodos(gtTodos)
    }
  }


	return(
      <>
        <div className="extech_todo_container">
          <Notices notices={notices} onUpdateNotices={setNotices}/>
          <div className="extech_todo_top_actions">
            <input value={inputText} onKeyPress={trackInputKeyPress} onChange={setInputTextVal} />
            <button onClick={addTodo}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <select onChange={(e)=>filterTheTodos(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">InComplete</option>
            </select>
          </div>
          <div className="extech_todo_list">
            {gTodos.length === 0 && (
               "No todos found" 
              )}
            {
              
              gTodos.length > 0 && gTodos.map((val,ind)=>{
                return <div key={ind} className="singleTodo">
                <span style={{color: val.completed ? 'blue':'black'}} className="todoTitle">{val.title}</span>
                <input type="checkbox" onChange={completedChecked} checked={val.completed}   data-id={ind}/ >
                <span >
                  <FontAwesomeIcon icon={faTrash} onClick={()=>deleteTodo(ind)}/>
                </span>

                </div>
              })
            }
          </div>
        </div>
      </>    
  )
}
export default Todo;