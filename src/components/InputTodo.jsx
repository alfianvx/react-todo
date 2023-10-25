import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/reducers/todo-reducer";

export default function InputTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    e.preventDefault();

    let newTodo = {
      todo: input,
      status: false,
    };

    dispatch(addTodo(newTodo));
    setInput("");
  };

  return (
    <div className="w-full flex gap-4 mb-10">
      <input
        type="text"
        className="border w-full p-2"
        placeholder="Add some todo . . . "
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="p-2 bg-black text-white rounded-sm"
        onClick={inputHandler}
      >
        add
      </button>
    </div>
  );
}
