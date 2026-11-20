//Displays all tasks.e

import React from "react";
import TaskItem from "./TaskItem";


//if the list is empty
function TaskList({tasks, onEditTask, onDeleteTask, onToggleTask}){
    // console.log("tasks",tasks)
    if (tasks.length === 0) {
    return(
        <p className="empty-message">
             No task avaiable ,add your first task!         
        </p>
    );
}


//when list already have some task
return(
    <div className="task-list"> 
        {tasks.map((task) => (
            <TaskItem
            key= {task.id}
            task = {task}
            onEditTask = {onEditTask}  //This passes the edit function further down to TaskItem.
            onDeleteTask={onDeleteTask}
            onToggleTask = {onToggleTask}
            />
        ))}
    </div>
);

}

export default TaskList;