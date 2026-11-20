//Main component. Manages application state and connects the other components.

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'



function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];    //if nothing is saved, start with empty array
  });

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks",tasks);
  }, [tasks]);   //dependency array: run this useEffect whenever the tasks value changes



  //this function receive the title and description from TaskForm
  const addTask = (title, description, dropdown) => {
    // create a newTask object'
    const newTask = {
      id: Date.now(),  //to generate a unique identifier for every task.
       title,
       description,
       dropdown,
      completed: false   // initially false because task is pending
    };

    //update the task array(spread operator(...tasks) copy the existing task, and newTask add the new task at the end)
     setTasks([...tasks, newTask]);


  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (id, title, description) => {
    const updatedTasks = tasks.map((task) =>
    task.id === id
    ? {...task, title, description}
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
        />
           
      </section>
      
    </div>


  );
}


export default App;
