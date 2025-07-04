
import React, { useState } from "react";
import "./App.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { motion, AnimatePresence } from "framer-motion";


function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // const addTask = () => {
  //   if (task.trim() === "") return;
  //   setTasks([...tasks, { text: task, completed: false }]);
  //   setTask("");
  // };
  const [shake, setShake] = useState(false);

const addTask = () => {
  if (task.trim() === "") {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    return;
  }
  setTasks([...tasks, { text: task, completed: false }]);
  setTask("");
};

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const updateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="app">
      <h2>To-Do List <NoteAltOutlinedIcon /></h2>
      <div className="input-group">
        {/* <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        /> */}
        <motion.input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        />
        <button className="addbutton" onClick={addTask}>Add</button>
      </div>
      <ul>
  <AnimatePresence>
    {tasks.map((t, index) => (
      <motion.li
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, x: 100 }}
        transition={{ duration: 0.3 }}
        className={t.completed ? "done" : ""}
      >
        {editingIndex === index ? (
          <>
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
            <div className="buttons">
              <button onClick={updateTask}><DoneOutlinedIcon /></button>
            </div>
          </>
        ) : (
          <>
            <span onClick={() => toggleTask(index)}>{t.text}</span>
            <div className="buttons">
              <button className="editbutton" onClick={() => startEditing(index)}><EditIcon /></button>
              <button className="deletebutton" onClick={() => deleteTask(index)}><DeleteIcon /></button>
            </div>
          </>
        )}
      </motion.li>
    ))}
  </AnimatePresence>
</ul>
    </div>
  );
}

export default App;