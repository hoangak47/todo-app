import "./App.css";


import TodoMain from "./layouts/todo_main";
import TodoHeader from "./layouts/todo_header";

function App() {
  return (
    <>
      <section className="todo-app">
        <div className="todo-app-box">
          <div className="todo-app-container">
            <TodoHeader />
            <TodoMain />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
