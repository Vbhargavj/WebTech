export function Todos({ todos }) {
    return (
      <div>
        {todos.map(function (todo) {
          return (
            <div> {/* Added key prop for each todo */}
              <h2>{todo.title}</h2> {/* Curly braces around todo.title */}
              <h3>{todo.description}</h3> {/* Curly braces around todo.description */}
              <button>
                {todo.completed === true ? "completed" : "Mark as Completed"}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
  