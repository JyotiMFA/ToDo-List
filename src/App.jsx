//Main component. Manages application state and connects the other components.

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'



function App() {
const [tasks, setTasks] = useState(() => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Corrupted tasks in localStorage, resetting:", error);
    localStorage.removeItem("tasks");
    return [];
  }
});

 

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  



  //this function receive the title, caterory and description from TaskForm
  const addTask = (title, description, category) => {
    // create a newTask object'
    const newTask = {
      id: Date.now(),  //to generate a unique identifier for every task.
       title,
       description,
       category,
      completed: false   // initially false because task is pending
    };

    //update the task array(spread operator(...tasks) copy the existing task, and newTask add the new task at the end)
     setTasks([...tasks, newTask]);
  };

  const editTask = (task) => {
    setEditingTask(task);
  };


  const updateTask = (id, title, description, category) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, title, description, category}
      : task
  );

  setTasks(updatedTasks);
  setEditingTask(null);
};

  

  const deleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if(confirmDelete){
      setTasks(tasks.filter((task) => task.id !== id));

      //This prevents the form from remaining in edit mode if the task being edited is deleted.
      if (editingTask?.id === id){
         setEditingTask(null);
      }
    }

  };


  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => (
      task.id === id
      ? {...task, completed: !task.completed}
      :task
    ));

  setTasks(updatedTasks);
  };
 




  return (
    <div className= "container">
      <header>
        <h1>To-Do List</h1>
        <p>Create, Manage and Track your daily work</p>
      </header>


       {/* pass the addTask function as a prop. This allows TaskForm to communicate with App.jsx. */}
      <TaskForm 
      onAddTask= {addTask} 
      editingTask = {editingTask}
      onUpdateTask = {updateTask}
      onCancelEdit= {() => setEditingTask(null)}
      />


      <section className="tasks-section">
          <h2>My Tasks </h2>

        <TaskList 
          tasks = {tasks}
          onEditTask = {editTask}
          onDeleteTask = {deleteTask}
          onToggleTask = {toggleTask}
          // category = {category}
        />
           
      </section>
      
    </div>


  );
}


export default App;
