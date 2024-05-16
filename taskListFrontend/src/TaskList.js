import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState();
    const url = 'https://ideal-potato-rj76w6gp5q7hww57-5000.app.github.dev/'

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        setError(false);

        axios
            .get(`${url}/tasks`)
            .then(response => {
                setTasks(response.data)
            })
            .catch((e) => {
                setError(true)
            });

    };

const createTask = (title) => {
    axios.post(`${url}task`, {title}).then(() => fetchTasks())
}

const updateTask = (task) => {
    axios.put(`${url}task/${task.id}`, {done: !task.done})
}

const deleteTask = async (id) => {
    try {
        await axios.delete(`${url}task/${id}`)
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
    } catch (error) {
        setError(true)
    }
}

    return (
        <div className="task-list-container">
            <h1>Rocket 2.0</h1>
           <div className="search-container"> 
           <input
                type="text"
                className="task-input"
                placeholder="Enter task"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
            />
            <button onClick={ ()=> createTask(newTask)}>Add New Task</button>
            </div>
            {error && <p className="notFound">Error, please try again!</p>}
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.done}
                            onClick={ ()=> updateTask(task)}/>
                        <span style={{textDecoration: task.done ? 'line-through' : 'none'}}>
                        {task.title}
                    </span>
                    <button onClick={ ()=> deleteTask(task.id)}>Delete Task</button>
                    </li>
                ))}
            </ul>


        </div>
    )

}

export default TaskList;
