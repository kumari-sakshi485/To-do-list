import { useState } from "react";

export default function Taskform({ onAdd }) {
  const [taskname, settaskname] = useState("");

  function handlesubmit(ev) {
    ev.preventDefault();
    onAdd(taskname);
    settaskname("");
  }

  return (
    <form onSubmit={handlesubmit}>
      <button type="submit">+</button>

      <input
        type="text"
        value={taskname}
        onChange={(ev) => settaskname(ev.target.value)}
        placeholder="Add your new task..."
      />
    </form>
  );
}
