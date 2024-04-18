import "./App.css";
import { useState } from "react";
function App() {
  const [todos, setTodos] = useState([
    {
      title: "go to the home",
      description: "this is real time example",
      completed: true,
    },
    {
      title: "learn dsa",
      description: "solve dsa problem",
      completed: false,
    },
    {
      title: "fuck yourself",
      description: "fuck yourself",
      completed: false,
    },
  ]);

  return (
    <div>
      {
        todos.map(function (todo) {
          return <Todo title={todo.title} description={todo.description} />;
        })
        /* <CustomButton count={count} setCount={setCount}></CustomButton> */
      }
    </div>
  );

  function CustomButton(props) {
    function onClickHandler() {
      props.setCount(props.count + 1);
    }
    return <button onClick={onClickHandler}>Counter {props.count}</button>;
  }
}

function Todo(pros){
  return <div>
    <h1>{pros.title}</h1>
    <h3>{pros.description}</h3>
  </div>
}

export default App;
