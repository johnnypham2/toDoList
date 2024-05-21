import { useState } from "react";

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
}

//input todo list
const Todo = () => {
  
  const [input, setInput] = useState("");
  
  const [list, setList] = useState<TodoItem[]>([]);
  
  const addTodo = (newItem: string) => {
    // Create a new todo item object with a random ID
    const newTodo: TodoItem = {
      id: Math.random(), // Generates a random id for the new todo item
      todo: newItem,
      completed: false,
    };
    // Update the list of todo items by adding the new todo item
    setList([...list, newTodo]);
    // clear the input field after adding the todo item
    setInput("");
  };

  //CROSSOUT FUNCTION (COMPLETED)
  const toggleComplete = (itemId: number) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };


  //DELETE FUNCTION 
  const deleteTodo = (itemId: number) => {
    setList((prevList) => prevList.filter((item) => item.id !== itemId));
  };




  return (
    <>
      <div className="myContainer">
        <div className="row">
          <h1>Todo List</h1>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Button to add a new todo item*/}
          <button className="addButton" onClick={() => addTodo(input)}>
            Add
          </button>
        </div>

        {/*Display todo items*/}
        <ul>
          {list.map((item) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              <button
                onClick={() => toggleComplete(item.id)}
                className={`todo-text-button ${
                  item.completed ? "completed" : ""
                }`}
              >
                {item.todo}
              </button>

              {/*Button to delete*/}
              <button onClick={() => deleteTodo(item.id)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
