import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  error: "",
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "START_FETCHING":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS_FETCHING":
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    default:
      return state;
  }
}

function startFetching() {
  return {
    type: "START_FETCHING",
  };
}

function successFetching(data) {
  return {
    type: "SUCCESS_FETCHING",
    payload: data,
  };
}

export const getTodo = () => async (dispatch) => {
  dispatch(startFetching());

  const { data } = await axios.get(
    "https://65388005a543859d1bb17fc8.mockapi.io/todo"
  );

  dispatch(successFetching(data));
};

export const addTodo = (newTodo) => async (dispatch) => {
  dispatch(startFetching());

  await axios.post("https://65388005a543859d1bb17fc8.mockapi.io/todo", newTodo);

  dispatch(getTodo());
};

export const deleteTodo = (id) => async (dispatch) => {
  dispatch(startFetching());

  await axios.delete(`https://65388005a543859d1bb17fc8.mockapi.io/todo/${id}`);

  dispatch(getTodo());
};

export const editTodo = (id, todo) => async (dispatch) => {
  dispatch(startFetching());

  await axios.put(`https://65388005a543859d1bb17fc8.mockapi.io/todo/${id}`, {
    todo: todo,
  });

  dispatch(getTodo());
};

export const editStatus = (id, status) => async (dispatch) => {
  dispatch(startFetching());

  await axios.put(`https://65388005a543859d1bb17fc8.mockapi.io/todo/${id}`, {
    status: status,
  });

  dispatch(getTodo());
};

export const getActiveTodo = (status) => async (dispatch) => {
  dispatch(startFetching());

  await axios.get(
    `https://65388005a543859d1bb17fc8.mockapi.io/todo?status=${status}`
  );
};

export default todoReducer;
