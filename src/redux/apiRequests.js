import { addTodo, removeTodo, toggleTodo } from "./todoSlice";

import axios from "axios";

const url = "https://todo-server-three.vercel.app/v1";

export const setTodo = async (todo, dispatch) => {
  try {
    await axios.post(`${url}/todo`, todo);
    dispatch(addTodo(todo));
  } catch (err) {
    // console.log(err);
  }
};

export const deleteTodo = async (id, dispatch) => {
  try {
    await axios.delete(`${url}/todo/${id}`);
    dispatch(removeTodo(id));
  } catch (err) {
    // console.log(err);
  }
};

export const updateTodo = async (todo, dispatch) => {
  try {
    await axios.put(`${url}/todo/${todo.id}`, todo);
  } catch (err) {
    // console.log(err);
  }
};

export const updateCompleted = async (check, dispatch) => {
  try {
    await axios.put(`${url}/todo/${check.id}`, check);
    dispatch(toggleTodo(check.id));
  } catch (error) {}
};
