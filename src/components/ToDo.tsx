import React from "react";
import { IToDo } from "../atoms";

export default function ToDo({ text, id, category }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
}
