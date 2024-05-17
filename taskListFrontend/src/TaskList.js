import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState();
    const url = 'https://cautious-barnacle-w576gg5v9r5fgjrr-5000.app.github.dev/'

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setError(false);
            try {
                const response = await axios.get(`${url}/tasks`)
                setTasks(response.data)
            } catch (error) {
                setError(true)
            }

    };

const createTask = async (e, title) => {
    e.preventDefault()

    try {
        await axios.post(`${url}task`, {title})
        fetchTasks()
    } catch (error) {
        console.error(`Error creating task ${title}`)
        setError(true)
    } finally {
        setNewTask('')
    }
}


const updateTask = async (task) => {
    try {
        await axios.put(`${url}task/${task.id}`, {done: !task.done})    
        setTasks(prevTasks => prevTasks.map(prevTask => prevTask.id === task.id ? {...prevTask, done: !prevTask.done} : prevTask))
    } catch (error) {
        console.error(`Error updating task ${task.id}: ${error}`)
        setError(true)
    }
    
}

const deleteTask = async (id) => {
    try {
        await axios.delete(`${url}task/${id}`)
        setTasks(prevTasks => prevTasks.filter(prevTask => prevTask.id !== id))
    } catch (error) {
        setError(true)
    }
}

    return (
        <div className="task-list-container">
            <h1>Rocket 2.0 🚀</h1>
           <div className="search-container"> 
           <form onSubmit={(e) => createTask(e, newTask)}> 
                <input
                    type="text"
                    className="task-input"
                    placeholder="Enter task"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                />
                <button type="submit">Add New Task</button>
           </form>

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
                        {task.title}</span>
                        <button onClick={ ()=> deleteTask(task.id)}>Delete Task</button>
                    </li>
                ))}
            </ul>


        </div>
    )

}

export default TaskList;
