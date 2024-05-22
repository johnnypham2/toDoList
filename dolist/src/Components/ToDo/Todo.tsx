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

//use state to keep track of the ID of the item being edited
  const [editingId, setEditingId] = useState<number|null>(null);

//use state to keep track of the UPDATED TEXT for the item being edited
  const [editingText, setEditingText] = useState("");
  
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


  //EDIT functiion
  //function to start editing a todo item
const startEditing = (itemId: number, itemText: string) => {
  setEditingId(itemId); // this stores the id of the item being edited
  setEditingText(itemText); //this stores the initial text of the item being edited
}

//function to stop editing (cancel or save)
const stopEditing = () => {
  //reset the editing id and editing text states
  setEditingId(null);
  setEditingText("");
}

  // Function to update a todo item with the edited text
  const updateTodo = (itemId: number, updatedText: string) => {
    // Update the list by creating a new list with the updated item
    setList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, todo: updatedText } : item
      )
    );
    // Stop editing after updating the item
    stopEditing();
  };


  return (
    <>
      <div className="myContainer">
        <div className="row">
          <h1>Today's List</h1>
          {editingId === null ? (
            <>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="addButton" onClick={() => addTodo(input)}>
                Add
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button onClick={() => updateTodo(editingId, editingText)}>
                Update
              </button>
              <button onClick={stopEditing}>Cancel</button>
            </>
          )}
        </div>
        <ul>
          {list.map((item) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              {editingId === item.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`todo-text-button ${
                    item.completed ? "completed" : ""
                  }`}
                >
                  {item.todo}
                </button>
              )}
              <button className="deleteButton" onClick={() => deleteTodo(item.id)}>x</button>
              {editingId !== item.id && (
                <button className="editButton" onClick={() => startEditing(item.id, item.todo)}>
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );


};

export default Todo;
