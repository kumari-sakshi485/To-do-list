import "./App.css";
import Taskform from "./Task-form";
import Task from "./Task";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  //new line
  const [mode, setMode] = useState("light");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    setTasks((prev) => [...prev, { name: name, done: false }]);
  }
  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  //n
  useEffect(() => {
    document.body.className = mode;
    localStorage.setItem("mode", mode);

    // Update current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    });

    return () => clearInterval(intervalId);
  }, [mode]);

  function deleteTask(taskIndex) {
    setTasks((prev) => prev.filter((_, index) => index !== taskIndex));
  }
  //for How many task is complete
  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return "Try to do at leat one!🙏";
    }
    if (percentage === 100) {
      return "Nice Job 😊";
    }
    return "Keep it Going 💪";
  }

  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }
  return (
    <main>
      <h1 align="center">Todo React App 📝</h1>
      <p align="center">
        🖊️ A simple Todo App built using{" "}
        <a href="https://reactjs.org/">React</a>
      </p>

      {/* <h1>
        {currentDateTime.toLocaleDateString()}{" "}
        {currentDateTime.toLocaleTimeString()}
      </h1> */}
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>

      <Taskform onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          key={index}
          {...task}
          creationDate={new Date()} // Provide the actual creation date here
          onRename={(newName) => renameTask(index, newName)}
          onToggle={(done) => updateTaskDone(index, done)}
          onDelete={() => deleteTask(index)}
        />
      ))}
    </main>
  );
}

export default App;
