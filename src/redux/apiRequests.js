import { addTodo, changeValueTodo, indexEdit, removeTodo, toggleTodo, toggleTodoAll } from "./todoSlice";

import axios from "axios";

export const setTodo = async (todo, dispatch) => {
  try {
    await axios.post("http://localhost:8000/v1/todo", todo);
    dispatch(addTodo(todo));
  } catch (err) {
    // console.log(err);
  }
};

export const deleteTodo = async (id, dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/v1/todo/${id}`);
    dispatch(removeTodo(id));
  } catch (err) {
    // console.log(err);
  }
};

export const updateTodo = async (todo, dispatch) => {
  try {
    await axios.put(`http://localhost:8000/v1/todo/${todo.id}`, todo);
    
  } catch (err) {
    // console.log(err);
  }
};

export const updateCompleted = async (check, dispatch) => {
  try {
    await axios.put(`http://localhost:8000/v1/todo/${check.id}`,check);
    dispatch(toggleTodo(check.id));
  } catch (error) {}
};

export const updateCompletedAll = async (completed, dispatch) => {
  try {
    await axios.get('http://localhost:8000/v1/todo/completedAll');
    dispatch(toggleTodoAll(completed));
  } catch (error) {}
}