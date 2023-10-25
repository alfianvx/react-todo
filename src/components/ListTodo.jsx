import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo, getTodo } from "../redux/reducers/todo-reducer";
import { BiSolidTrashAlt, BiSolidPencil, BiSolidSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

export default function ListTodo() {
  const [isEdit, setIsEdit] = useState(null);
  const [editValue, setEditValue] = useState("");

  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  const deleteButtonHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  const editTodoHandler = (id, todo) => {
    setIsEdit(id);
    setEditValue(todo);
  };

  const editButtonHandler = (id) => {
    dispatch(editTodo(id, editValue));
    setIsEdit(null);
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
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      ) : (
        <ul>
          {todos.map((item) => (
            <li
              key={item.id}
              className="w-full flex justify-between items-center my-8 gap-8"
            >
              {isEdit === item.id ? (
                <>
                  <input
                    className="font-semibold bg-white border border-black p-2 w-full"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-zinc-800 text-white rounded-sm"
                      onClick={() => editButtonHandler(item.id)}
                    >
                      <BiSolidSave className="text-white hover:text-green-500" />
                    </button>
                    <button
                      className="p-2 bg-zinc-800 text-white rounded-sm"
                      onClick={() => setIsEdit(null)}
                    >
                      <MdCancel />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="p-2">{item.todo}</span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-zinc-800 text-white rounded-sm"
                      onClick={() => editTodoHandler(item.id, item.todo)}
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
