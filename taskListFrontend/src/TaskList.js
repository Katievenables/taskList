import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState();
    const url = 'http://127.0.0.1:5000'


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
    void axios.post(`${url}/task`,{title})
}
//
// const toggleTask = () => {
//     axios
// }
//
// const deleteTask = => {
//     axios
// }

    return (
        <div className="task-list-container">
            <h1>Rocket 2.0</h1>
            <input
                type="text"
                className="task-input"
                placeholder="Enter task"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
            />
            <button onClick={ ()=> createTask(newTask)}>Add New Task</button>
            {error && <p className="notFound">Error, please try again!</p>}
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.done}/>
                        <span style={{textDecoration: task.done ? 'line-through' : 'none'}}>
                        {task.title}
                    </span>
                    </li>
                ))}
            </ul>


        </div>
    )

}

export default TaskList;
