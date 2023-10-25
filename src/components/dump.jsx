import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodo,
  updateTodo,
} from "../redux/reducers/todo-reducer"; // You need to import updateTodo from your reducer
import { BiSolidTrashAlt, BiSolidPencil, BiSolidSave } from "react-icons/bi";

export default function ListTodo() {
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  const deleteButtonHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  // Step 1: Add state for editing
  const [editMode, setEditMode] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  // Step 2: Function to start editing
  const startEditing = (id, todo) => {
    setEditMode(id);
    setEditedTodo(todo);
  };

  // Step 3: Function to save changes
  const saveChanges = (id) => {
    dispatch(updateTodo({ id, todo: editedTodo }));
    setEditMode(null);
  };

  return (
    <>
      <div className="flex gap-2">
        <button className="py-1 px-2 border rounded-md bg-black text-white duration-50">
          all
        </button>
        <button className="py-1 px-2 border rounded-md bg-zinc-100 hover:bg-black hover:text-white duration-50">
          active
        </button>
        <button className="py-1 px-2 border rounded-md bg-zinc-100 hover:bg-black hover:text-white duration-50">
          completed
        </button>
      </div>
      {todos.length === 0 ? (
        <h1 className="flex justify-center mt-24 text-lg font-semibold">
          there is no activity
        </h1>
      ) : isLoading ? (
        <div className="flex justify-center mt-24">
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      ) : (
        <ul>
          {todos.map((item) => (
            <li
              key={item.id}
              className="w-full flex justify-between items-center my-5"
            >
              {editMode === item.id ? ( // Step 2: Render input field when in edit mode
                <>
                  <input
                    className="font-semibold bg-white"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                  />
                  <button
                    className="p-2 bg-zinc-800 text-white rounded-sm"
                    onClick={() => saveChanges(item.id)} // Step 3: Save changes
                  >
                    <BiSolidSave className="text-white hover:text-green-500" />
                  </button>
                </>
              ) : (
                <>
                  <span>{item.todo}</span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-zinc-800 text-white rounded-sm"
                      onClick={() => startEditing(item.id, item.todo)} // Step 2: Enable editing
                    >
                      <BiSolidPencil className="text-white hover:text-yellow-400" />
                    </button>
                    <button
                      className="p-2 bg-zinc-800 text-white rounded-sm"
                      onClick={() => deleteButtonHandler(item.id)}
                    >
                      <BiSolidTrashAlt className="text-white hover:text-red-500" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
