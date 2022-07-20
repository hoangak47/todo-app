import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],

    editIndex: null,

    switchAction: ["All", "Active", "Completed"],
    switchIndex: 0,
  },
  reducers: {
    setTodo: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
    toggleTodoAll: (state, action) => {
      console.log(action.payload);
      state.todos = state.todos.map((todo) => {
        todo.completed = action.payload;
        return todo;
      });
    },
    indexEdit: (state, action) => {
      state.editIndex = action.payload;
    },
    changeValueTodo: (state, action) => {
      state.todos = state.todos.map((todo, index) => {
        if (index === state.editIndex) {
          return { ...todo, title: action.payload };
        }
        return todo;
      });
    },
    indexSwitch: (state, action) => {
      state.switchIndex = action.payload;
    },
    clearCompleted: (state, action) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    sortByName: (state, action) => {
      if (action.payload === true) {
        state.todos = state.todos.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      } else {
        state.todos = state.todos.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      }
    },

    sortByCompleted: (state, action) => {
      if (action.payload === true) {
        state.todos = state.todos.sort((a, b) => {
          return a.completed - b.completed;
        });
      } else {
        state.todos = state.todos.sort((a, b) => {
          return b.completed - a.completed;
        });
      }
    },
  },
});

export const {
  setTodo,
  addTodo,
  removeTodo,
  toggleTodo,
  toggleTodoAll,
  indexEdit,
  changeValueTodo,
  indexSwitch,
  clearCompleted,
  sortByName,
  sortByCompleted,
} = todoSlice.actions;
export default todoSlice.reducer;
