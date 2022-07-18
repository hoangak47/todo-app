import React, { useEffect, useState } from "react";

import { Select, notification, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import "../access/main.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  changeValueTodo,
  indexEdit,
  indexSwitch,
  setTodo,
  sortByCompleted,
  sortByName,
} from "../redux/todoSlice";
import axios from "axios";
import { deleteTodo, updateCompleted, updateTodo } from "../redux/apiRequests";

function TodoMain() {
  const { Option } = Select;
  const filterOptions = ["All", "Active", "Completed"];
  const sortOptions = ["Sort by name", "Sort by completed"];

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const editIndex = useSelector((state) => state.todo.editIndex);
  const switchIndex = useSelector((state) => state.todo.switchIndex);

  const [inputEdit, setInputEdit] = useState("");

  const handleChangeFilter = (value) => {
    dispatch(indexSwitch(value));
  };

  const [data, setData] = useState([]);

  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    switch (switchIndex) {
      case 0:
        setData(todos);
        break;
      case 1:
        setData(todos.filter((todo) => !todo.completed));
        break;
      case 2:
        setData(todos.filter((todo) => todo.completed));
        break;
      default:
        setData(todos);
    }
  }, [switchIndex, todos]);

  const handleChangeSort = (value) => {
    switch (value) {
      case "Sort by name":
        dispatch(sortByName(true));
        break;
      case "Sort by completed":
        dispatch(sortByCompleted(false));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    axios.get(`${url}/todo`).then(({ data }) => {
      dispatch(setTodo(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    deleteTodo(id, dispatch);
    notification.open({
      message: "Delete successfully",
      description: "",
      icon: <CheckCircleOutlined style={{ color: "#4caf50" }} />,
    });
  };

  const handleCheck = (todo) => {
    const check = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
    };
    updateCompleted(check, dispatch);
  };

  const handleSave = (todo) => {
    const a = {
      ...todo,
      title: inputEdit,
    };
    dispatch(changeValueTodo(a.title));
    updateTodo(a, dispatch);
    setInputEdit("");
    dispatch(indexEdit(null));
    notification.open({
      message: "Update successfully",
      description: "",
      icon: <CheckCircleOutlined style={{ color: "#4caf50" }} />,
    });
  };


  return (
    <div className="todo-main">
      <div className="todo-main-header">
        <div className="filter">
          <span className="todo-main-header-title">Filter</span>
          <Select
            defaultValue="All"
            style={{ width: 120 }}
            onChange={handleChangeFilter}
            className="select"
          >
            {filterOptions.map((option, index) => (
              <Option key={index} value={index}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
        <div className="sort">
          <span className="todo-main-header-title">Sort</span>
          <Select
            defaultValue="None"
            style={{ width: 160 }}
            onChange={handleChangeSort}
          >
            {sortOptions.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <ul className="todo-main-body">
        {data.length !== 0 ? (
          data?.map((todo, index) => {
            return (
              <li
                className={`item ${editIndex === index && "edit"}`}
                key={index}
              >
                <div className={`item-left ${todo.completed && "completed"}`}>
                  <div
                    className="item-checkbox"
                    onClick={() => handleCheck(todo)}
                  >
                    {todo.completed && <CheckOutlined />}
                  </div>
                  <span className="title">{todo.title}</span>
                  <input
                    type="text"
                    value={inputEdit}
                    onChange={(e) => setInputEdit(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSave(todo);
                      }
                    }}
                  />
                </div>
                <div className="item-action">
                  <div className="item-action-control">
                    <Button
                      className="save-edit"
                      type="primary"
                      size="small"
                      onClick={() => handleSave(todo)}
                    >
                      Save
                    </Button>
                    <Button
                      className="save-edit"
                      size="small"
                      onClick={() => dispatch(indexEdit(null))}
                    >
                      Cancel
                    </Button>
                    {!todo.completed ? (
                      editIndex !== null ? (
                        editIndex !== index ? (
                          <EditOutlined
                            className="ic-edit"
                            onClick={() => {
                              dispatch(indexEdit(index));
                              setInputEdit(todo.title);
                            }}
                          />
                        ) : (
                          ""
                        )
                      ) : (
                        <EditOutlined
                          className="ic-edit"
                          onClick={() => {
                            dispatch(indexEdit(index));
                            setInputEdit(todo.title);
                          }}
                        />
                      )
                    ) : (
                      ""
                    )}
                    {editIndex !== null ? (
                      editIndex !== index ? (
                        <DeleteOutlined
                          className="ic-delete"
                          onClick={() => handleDelete(todo.id)}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      <DeleteOutlined
                        className="ic-delete"
                        onClick={() => handleDelete(todo.id)}
                      />
                    )}
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <div className="no-data">Don't have data</div>
        )}
      </ul>
    </div>
  );
}

export default TodoMain;
