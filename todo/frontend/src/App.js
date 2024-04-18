import { useState,useEffect } from "react";
import { CreateTodos } from "./componets/CreateTodo";
import { Todos } from "./componets/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then(res => res.json())
      .then(data => setTodos(data.todos))
      .catch(error => console.error("Error fetching todos:", error));
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // fetch("http/localhost:3001/todos").then(async function (res) {
  //   const data = await res.json();
  //   setTodos(data.todos);
  // });
  return (
    <div>
      <CreateTodos></CreateTodos>
      <Todos
        todos={todos}
      ></Todos>
    </div>
  );
}

export default App;
