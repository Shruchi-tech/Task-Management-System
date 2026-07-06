import { useState } from "react";
import axios from "axios";

function TaskForm({ fetchTasks }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDuedate] = useState("");
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("pending");

    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/tasks",
                {
                    title,
                    description,
                    duedate,
                    priority,
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Task Added");

            setTitle("");
            setDescription("");
            setDuedate("");
            setPriority("medium");
            setStatus("pending");

            fetchTasks();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <input
                type="date"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
            />

            <br /><br />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <br /><br />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <br /><br />

            <button type="submit">
                Add Task
            </button>

        </form>

    );

}

export default TaskForm;