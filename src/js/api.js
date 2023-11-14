const API_URL = 'https://playground.4geeks.com/apis/fake/todos/user/boxmancoder';

export const fetchTasks = () => {
    return fetch(API_URL)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
};

export const syncTasksWithServer = (tasks) => {
    return fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify(tasks.map(task => ({ label: task, done: false }))),
        headers: { "Content-Type": "application/json" }
    })
    .then(resp => {
        console.log('Response OK:', resp.ok); // will be true if the response is successful
        console.log('Response Status:', resp.status); // the status code = 200 or code = 400 etc.
        return resp.text(); // will try to return the exact result as string
    })
    .then(text => {
        try {
            return JSON.parse(text); // Try parsing text to JSON
        } catch (error) {
            console.log('Received non-JSON response:', text);
            return text; // Return text if JSON parsing fails
        }
    })
    .then(data => {
        console.log('Data from server:', data); // prints the object received from the server
    })
    .catch(error => {
        console.error('Error:', error); // error handling
    });
};