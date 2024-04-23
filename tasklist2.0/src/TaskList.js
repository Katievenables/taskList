import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState();
}

useEffect(() => {
fetchTasks();
} []);

const fetchTasks = () => {
    setError(false);

    axios
        .get('/tasks',)
        .then(response => {
            setTasks(response.data)
        })
        .catch((e) => {
            setError(true)
        });

};

const addTask = () => {
    axios
}

const toggleTask = () => {
    axios
}

const toggleTask = () => {
    axios
}

const deleteTask = => {
    axios
}

return (
    <div className="task-list-container">
        <h1>Your Tasks</h1>
        <input
            type="text"
            className="task-input"
            placeholder="Enter task"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            />
        <button onClick={addTask}>Add New Task</button>
        {error && <p className="notFound">Error, please try again!</p>}
        <ul>
            {tasks.map(task => (
                <li key={task.id} className="task-item">
                    <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id, task.done)}/>
                    <span style={{ textDecoration: task.done ? 'line-through' : 'none'}}>
                        {task.title}
                    </span>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>


    </div>
)



export default TaskList;