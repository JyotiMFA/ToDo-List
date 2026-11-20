//Displays an individual task with Edit, Delete, and Complete actions.

import React from "react";


function TaskItem({task, onEditTask, onDeleteTask, onToggleTask }){
    return(
        <div className={`task-card $ {task.completed ? "completed" : ""}`}>

        <div className="task-info">
            <input 
            type="checkbox"  
            checked= {task.completed}  //connects the checkbox to the task's status
            //onChange calls the function whenever the checkbox changes.
            //task.id identifies which task needs updating.
            onChange={() => onToggleTask(task.id)}     
            />

            <h3>Title: {task.title}</h3>

            <p className="task-category">
                Category: {task.category}
            </p>

            <p>Description: {task.description}</p>

            <span>
                {task.completed ? "Completed" : "Pending"}
            </span>
        </div>


        <div className="task-buttons">
            <button type="button" onClick={() => onEditTask(task)}>Edit</button>
            <button type="button" onClick={()=> onDeleteTask(task.id)}>Delete</button>
        </div>

        </div>
    );
}

export default TaskItem;
