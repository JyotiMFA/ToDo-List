//Contains the form for adding and editing tasks. Take the input from user

import React from "react";
import { useState, useEffect } from "react";

function TaskForm({
    onAddTask,
    editingTask,
    onUpdateTask,
    onCancelEdit
}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");


    //This checks whether a task has been selected for editing.
    useEffect(() =>{
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle("");
            setDescription("");
        } 
    }, [editingTask]);   //The [editingTask] dependency means the effect runs whenever the selected task changes.


    //preventDefault() stops the browser from refreshing the page when the form is submitted.
     const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()){
            alert("Please enter a task title!");
            return;
        }

        if (editingTask){
            onUpdateTask(
                editingTask.id,
                title.trim(),
                description.trim()
            );
        } else {
        //TaskForm sends the title and description to the parent component.
        onAddTask(title.trim(), description.trim());
        }

       //After successfully adding a task, both input fields become empty again.
        setTitle("");
        setDescription("");        
     };

  const handleCancel = () => {
    onCancelEdit();
  };


    return(

        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">

                    <label > Task Title *</label>
                    <input 
                    type="text" 
                    placeholder="Enter task title..."
                    value={title}

                    //Capture user input.|| e represents the input event.|| e.target represents the input element. || e.target.value gives us the text entered by the user.
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                    
            </div>

            <div className="form-group">
                <label > Category </label>
                    <select type="dropdown"
                    value={category}
                    onChange={(e)=> setCategory(e.target.value)}>

                        <option value="account">Accounting</option>
                        <option value="eng">Engineering</option>
                        <option value="finance">Finance</option>
                        <option value="meet">Meeting</option>
                        <option value="sales">Sales</option>
                        <option value="other">Other</option>


                    </select>
            </div>


                <div className="form-group">
                    <label >Task Description(Optional)</label>
                    <textarea 
                    placeholder= "Enter task description..." 
                    rows= "3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            
             <button type="submit">
                {editingTask ? "Update Task" : "+ Add Task"}
             </button>

              {editingTask && (
                 <button type="button" onClick={handleCancel}>
                  Cancel
            </button>
      )}

    </form>


    );
}

export default TaskForm;