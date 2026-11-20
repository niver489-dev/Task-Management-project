import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ProgressTracker from "./components/ProgressTracker";
import './style.css'

export default function App() {

  // Load tasks from Local Storage
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Update task (Complete / Undo)
  const updateTask = (updatedTask, index) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  };
  const clearTasks = ()=>{
    setTasks([]);
  }

  return (
    <div className="App">
      <header>
        <h1 className="Title">TaskBuddy</h1>
        <p className="Tagline">Your friendly Task Manager</p>
      </header>

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      <ProgressTracker tasks={tasks} />
      {tasks.length > 0 && (<button className="clear-btn" onClick={clearTasks}>Clear All tasks</button>)}
      
    </div>
  );
} 