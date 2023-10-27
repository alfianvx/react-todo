import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/reducers/todo-reducer";
import { BsFillPlusSquareFill } from "react-icons/bs";

export default function InputTodo() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    e.preventDefault();

    try {
      if (input == "") {
        throw new Error("todo cannot be empty");
      }

      let newTodo = {
        todo: input,
        status: true,
      };

      dispatch(addTodo(newTodo));
      setInput("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mb-10">
      <div className="w-full flex gap-4">
        <input
          type="text"
          className="border w-full p-2"
          placeholder="Add some todo . . . "
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="h-full text-zinc-800 " onClick={inputHandler}>
          <BsFillPlusSquareFill className="text-4xl" />
        </button>
      </div>
      {error && (
        <span className="text-red-500 font-semibold text-xs">* {error}</span>
      )}
    </div>
  );
}
