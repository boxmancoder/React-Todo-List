const API_URL = 'https://playground.4geeks.com/apis/fake/todos/user/boxmancoder';

// Function to fetch existing todos
export const fetchTodos = () => {
    return fetch(API_URL)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
};

// Function to create a new todo list (empty list initialization)
export const createTodoList = () => {
    return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([])
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
};

// Function to update the entire list of todos
export const syncTasksWithServer = (tasks) => {
    return fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks.map(task => ({ label: task.label, done: task.done })))
    })
    .then(resp => {
        console.log('Response OK:', resp.ok);
        console.log('Response Status:', resp.status);
        return resp.text();
    })
    .then(text => {
        try {
            return JSON.parse(text);
        } catch (error) {
            console.log('Received non-JSON response:', text);
            return text;
        }
    })
    .then(data => {
        console.log('Data from server:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

// Function to delete the user's todo list
export const deleteTodoList = () => {
    return fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
};