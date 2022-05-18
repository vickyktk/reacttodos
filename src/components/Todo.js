import { useState , useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import "./todo.css";

function Notices(props) {
  let notices = props.notices;
  function removeNotice(id) {
    let filteredNotices = notices.filter((val, ind) => {
      return ind !== id;
    });

    props.onUpdateNotices(filteredNotices);
  }
  let clearNotices = () => {
    props.onUpdateNotices([]);
  };
  return (
    <>
      <div className="extech_notices">
        {notices.length > 2 && (
          <div>
            <button onClick={clearNotices} className="clearNotices">
              Clear All
            </button>
          </div>
        )}
        {notices.map((val, ind) => {
          return (
            <div className={`extech_notice_${val.type}`} key={ind}>
              <p>{val.message}</p>
              <span>
                <FontAwesomeIcon
                  icon={faRemove}
                  onClick={() => removeNotice(ind)}
                />
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}


if (!localStorage.getItem("localTodos"))
  localStorage.setItem("localTodos", JSON.stringify([]));


function Todo(props) {
  let localTodos = localStorage.getItem("localTodos");
  let [todos, setTodos] = useState(JSON.parse(localTodos));
  let [gTodos, setgTodos] = useState(JSON.parse(localTodos));

  useEffect(()=>{
    localStorage.setItem("localTodos", JSON.stringify(todos));
  }, [todos])

  let [inputText, setInputText] = useState("");
  const [notices, setNotices] = useState([]);

  let trackInputKeyPress = (e) => {
    if (13 === e.which) {
      if ("" === inputText) {
        let obj = {
          message: "Please enter some text",
          type: "error"
        };
        setNotices([...notices, obj]);
        return;
      }

      let obj = { title: inputText, completed: false };
      setTodos([...todos, obj]);
      setgTodos([...todos, obj]);

      setInputText("");
    }
  };

  let addTodo = () => {
    if ("" === inputText) {
      let obj = {
        message: "Please enter some text",
        type: "error"
      };
      setNotices([...notices, obj]);
      return;
    }

    let obj = { title: inputText, completed: false };
    setTodos([...todos, obj]);
    setgTodos([...todos, obj]);

    setInputText("");
  };
  let setInputTextVal = (e) => {
    setInputText(e.target.value);
  };

  let completedChecked = (e) => {
    let id = parseInt(e.target.getAttribute("data-id"), 2);
    let filteredTodos = todos.filter((val, ind) => {
      if (id === ind) {
        val.completed = !val.completed;
      }
      return val;
    });
    setTodos(filteredTodos);
    setgTodos(todos);
  };
  let deleteTodo = (id) => {
    let filteredTodos = todos.filter((val, ind) => {
      return id !== ind;
    });

    let obj = {
      message: "Your Todo has been deleted successfully",
      type: "success"
    };
    setNotices([...notices, obj]);
    setTodos(filteredTodos);
    setgTodos(filteredTodos);
  };

  let filterTheTodos = (val) => {
    console.log(val);
    if ("all" === val) {
      setgTodos(todos);
    }
    if ("completed" === val) {
      let gtTodos = todos.filter((val) => val.completed === true);
      setgTodos(gtTodos);
    }
    if ("active" === val) {
      let gtTodos = todos.filter((val) => val.completed !== true);
      setgTodos(gtTodos);
    }
  };


  return (
    <>
      <div className="extech_todo_container">
        <Notices notices={notices} onUpdateNotices={setNotices} />
        <div className="extech_todo_top_actions">
          <input
            value={inputText}
            onKeyPress={trackInputKeyPress}
            onChange={setInputTextVal}
            placeholder={"What's your plan for today?"}
          />
          <button onClick={addTodo} className="button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <select onChange={(e) => filterTheTodos(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active Tasks</option>
          </select>
        </div>

        <div className="extech_todo_list">
          {gTodos.length === 0 && "No todos found"}
          {gTodos.length > 0 &&
            gTodos.map((val, ind) => {
              return (
                <div key={ind} className="singleTodo">
                  <input
                    type="checkbox"
                    onChange={completedChecked}
                    checked={val.completed}
                    data-id={ind}
                    className="checkbox"
                  />

                  <span
                    className={`todoTitle ${val.completed ? "selected" : ""}`}
                  >
                    {val.title}
                  </span>

                  <span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteTodo(ind)}
                    />
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Todo;
