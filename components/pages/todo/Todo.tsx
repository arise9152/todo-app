"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };
  const editTask = (index: number) => {
    const newTask = prompt("Edit task:", tasks[index]);
    if (newTask !== null) {
      setTasks(tasks.map((t, i) => (i === index ? newTask : t)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List Lite</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="flex flex-col sm:flex-row gap-2 mb-4"
        >
          <Input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 "
          />
          <Button type="submit" variant={"outline"}>
            Add
          </Button>
          <Button type="button" onClick={clearAllTasks}>
            Clear All
          </Button>
        </form>

        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <div>
              <li
                key={index}
                onClick={() => removeTask(index)}
                className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200 transition"
              >
                {t}
              </li>
              <Button onClick={() => editTask(index)}>Edit</Button>
            </div>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No tasks yet</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
