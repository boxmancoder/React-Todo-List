import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { fetchTasks, syncTasksWithServer } from '../api.js';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');

    useEffect(() => {
        fetchTasks()
            .then(fetchedTasks => setTasks(fetchedTasks.map(task => task.label)))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleAddTask = () => {
        if (currentTask.trim() !== '') {
            const updatedTasks = [...tasks, currentTask];
            setTasks(updatedTasks);
            syncTasksWithServer(updatedTasks);
            setCurrentTask('');
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(updatedTasks);
        syncTasksWithServer(updatedTasks);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    const handleClearAllTasks = () => {
        setTasks([]);
        syncTasksWithServer([]);
    };


    return (
        <div className="todo-container">
            <div className="header-container">
                <h1>
                    <FontAwesomeIcon icon={faClipboardList} /> The ToDoList
                </h1>
                <input 
                    type="text" 
                    className="input-secondary"
                    placeholder="Type an activity here!" 
                    value={currentTask}
                    onChange={e => setCurrentTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <ul>
                {tasks.length === 0 ? (
                    <li className="todo-card">No tasks, add a task</li>
                ) : (
                    tasks.map((task, index) => (
                        <li key={index} className="todo-card task">
                            {task} 
                            <span 
                                className="trash-icon" 
                                style={{marginLeft: '10px', cursor: 'pointer'}} 
                                onClick={() => handleDeleteTask(index)}>
                                🗑️
                            </span>
                        </li>
                    ))
                )}
            </ul>
            <button onClick={handleClearAllTasks}>Clear All Tasks</button>

            <style jsx>{`

    input[type="text"].input-secondary {
    background-color: #6c757d;
    border: 1px solid #5a6268;
    border-radius: 0.25rem;
    color: #ffffff;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input[type="text"].input-secondary::placeholder {
    color: #ffffff;
    opacity: 1;
}

input[type="text"].input-secondary:focus {
    border-color: #4e555b;
    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
    outline: none;
}

                .todo-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .header-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px; /* Spacing between the items */
                }

                .todo-card {
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    margin-bottom: 10px;
                    list-style-type: none;
                }
            `}</style>
        </div>
    );
}

export default TodoApp;
