import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  editStatus,
  editTodo,
  getTodo,
} from "../redux/reducers/todo-reducer";
import { BiSolidTrashAlt, BiSolidPencil, BiSolidSave } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiCircle } from "react-icons/fi";

export default function ListTodo() {
  const [isEdit, setIsEdit] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const { isLoading, todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

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
    try {
      if (editValue == "") {
        throw new Error("value cannot empty");
      }

      dispatch(editTodo(id, editValue));
      setIsEdit(null);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const statusButtonHandler = (id, currentStatus) => {
    const newStatus = !currentStatus;
    dispatch(editStatus(id, newStatus));
  };

  const filteredTodos = todos.filter((item) => {
    if (filter === "active") {
      return item.status === true;
    } else if (filter === "completed") {
      return item.status === false;
    }
    return true;
  });

  const setActiveFilter = (filterName) => {
    return filter === filterName
      ? "bg-black text-white"
      : "bg-zinc-100 hover:bg-black hover:text-white";
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          className={`py-1 px-2 border rounded-md ${setActiveFilter("all")}`}
          onClick={() => setFilter("all")}
        >
          all
        </button>
        <button
          className={`py-1 px-2 border rounded-md ${setActiveFilter("active")}`}
          onClick={() => setFilter("active")}
        >
          active
        </button>
        <button
          className={`py-1 px-2 border rounded-md ${setActiveFilter(
            "completed"
          )}`}
          onClick={() => setFilter("completed")}
        >
          completed
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-24">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      ) : (
        <>
          {todos.length === 0 ? (
            <h1 className="flex justify-center mt-24 text-lg font-semibold">
              there is no activity
            </h1>
          ) : (
            <ul>
              {filteredTodos.map((item) => (
                <li
                  key={item.id}
                  className="w-full flex justify-between items-center my-8 gap-8"
                >
                  {isEdit === item.id ? (
                    <>
                      <div className="flex flex-col justify-center">
                        <input
                          className="font-semibold bg-white border border-black p-2 w-full"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                        {error && (
                          <span className="text-red-500 font-semibold text-xs p-1">
                            * {error}
                          </span>
                        )}
                      </div>
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
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            statusButtonHandler(item.id, item.status)
                          }
                        >
                          {item.status ? <FiCircle /> : <BsCheckCircleFill />}
                        </button>
                        <span className="p-2">{item.todo}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className={
                            item.status
                              ? "p-2 bg-zinc-800 text-white rounded-sm"
                              : "hidden"
                          }
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
      )}
    </>
  );
}
