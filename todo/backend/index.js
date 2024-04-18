const express = require("express");
const { body } = require("body-parser");
const cors = require("cors");
const { createTodo, updateTodo } = require("./type");
const { todo } = require("./todoModel");


const app = express();
app.use(cors())

// app.use(body());
app.use(express.json());

app.post("/todo", async function (req, res) {
  const createPlaylaod = req.body;
  const parsePlayload = createTodo.safeParse(createPlaylaod);
//   console.log(parsePlayload)
  if (!parsePlayload.success) {
    res.json({
      msg: "you can not send this fuck",
    });
    return;
  }
  //   here update in the mongodb
  const result = await todo.create({
    title: parsePlayload.data.title,
    description: parsePlayload.data.description,
    completed: false,
  });
  if (!result) {
    res.json({ msg: "something went wrong" });
    return;
  }
  res.json({
    msg: "todos is created",
  });
});
app.get("/todos", async function (req, res) {
  const result = await todo.find({});
  if (!result) {
    res.json({ msg: "something went wrong" });
    return;
  }
  res.json({
    msg: "done",
    result: result.length,
    todos: result,
  });
});

app.put("/completed", async function (req, res) {
  const updatePlaylaod = req.body;
  const parsePlayload = updateTodo.safeParse(updatePlaylaod);
  if (!parsePlayload.success) {
    res.json({
      msg: "you can not send this fuck",
    });
    return;
  }
  const result = await todo.update({ _id: req.body.id }, { completed: true });
  if (!result) {
    res.json({
      msg: "some thing went wrong",
    });
    return;
  }
  res.json({
    msg: "todo completed",
  });
});

app.listen(3001, () => {
  console.log("i am running ");
});
