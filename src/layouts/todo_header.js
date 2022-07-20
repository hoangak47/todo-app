import React, { useRef } from "react";

import { Button, notification} from "antd";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import "../access/header.scss";
import 'antd/dist/antd.min.css';

import { useDispatch, useSelector } from "react-redux";
import { setTodo } from "../redux/apiRequests";

function TodoHeader() {
  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (input.current.value === "") {
      notification.open({
        message: "Please enter a todo",
        description: "",
        icon: <InfoCircleOutlined style={{ color: "red" }} />,
      });
      return;
    }
    const add = {
      id: todos.length !== 0 ? todos[todos.length - 1].id + 1 : 1,
      title: input.current.value,
      completed: false,
    };
    setTodo(add, dispatch);
    e.target.value = "";
    input.current.value = "";
    notification.open({
      message: "Add todo successfully",
      description: "",
      icon: <CheckCircleOutlined style={{ color: "#4caf50" }} />,
    });
  };

  const input = useRef(null);


  return (
    <header className="header">
      <h2>My Todos</h2>
      <div className="header-input">
        <input
          ref={input}
          type="text"
          placeholder="What needs to be done?"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo(e);
            }
          }}
        />
        
        <Button
          className="btn-add"
          type="primary"
          onClick={(e) => handleAddTodo(e)}
        >
          Add
        </Button>
      </div>
    </header>
  );
}

export default TodoHeader;
