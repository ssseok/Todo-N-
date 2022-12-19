import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

export default function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((prevToDos) =>
      prevToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, category: newCategory } : toDo
      )
    );
  };
  const onDeleteClick = () => {
    setToDos((prevToDos) => prevToDos.filter((todo) => todo.id !== id));
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TODO && (
        <button onClick={() => onClick(Categories.TODO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
      <button onClick={onDeleteClick}>삭제</button>
    </li>
  );
}
