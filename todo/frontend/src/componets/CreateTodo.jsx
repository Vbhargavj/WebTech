import { useState } from "react";

export function CreateTodos() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const addTodo = () => {
    // console.log(title,description)
    fetch("http://localhost:3001/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to add todo");
        }
        const json = await res.json();
        alert("Todo added");
        console.log(json);
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  return (
    <div>
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <br />
      <button
        style={{ padding: 10, margin: 10 }}
        onClick={addTodo}
      >
        Add A Todo
      </button>
    </div>
  );
}
