import { useEffect, useState } from "react";
import "./App.css";
import Toast from "./Components/Toast";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import { TodoProvider } from "./Context/TodoContext";


function App() {
  const [todos, setTodos] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showSuccessToast = () => {
    setToastMessage('Task added successful!');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const showErrorToast = () => {
    setToastMessage('Task Deleted!');
    setToastType('error');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };



  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    showSuccessToast();
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))

    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    //  toast("Task Deleted!");
    showErrorToast();
  };

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? {
            ...prevTodo,
            completed: !prevTodo.completed,
          }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text

  return (
    <>
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
        <div className=" min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto  rounded-lg px-4 py-3 text-white">
            <h1 className="text-4xl font-extrabold text-center mb-8 mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text p-4 rounded-lg  transition-transform transform hover:scale-105 duration-300 ease-in-out sm:text-5xl">
              The Accomplishment Archive
            </h1>

            <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {showToast && (
          <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
        )}
      </TodoProvider>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
