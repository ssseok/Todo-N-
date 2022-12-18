import React from "react";
import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import AddToDo from "./AddToDo";
import ToDo from "./ToDo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  console.log(toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <AddToDo />
      <ul>
        {toDos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}
