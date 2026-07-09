import { useState } from "react";
import { createTask } from "../services/api";

function TaskForm({ fetchTasks }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDuedate] = useState("");
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("pending");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createTask({
                title,
                description,
                duedate,
                priority,
                status,
            });

            alert("Task Added");

            setTitle("");
            setDescription("");
            setDuedate("");
            setPriority("medium");
            setStatus("pending");

            fetchTasks();

        } catch (err) {

            console.log(err);

            alert(err.response?.data?.message || "Failed to Add Task");

        }

    };

   return (

<div>

<form onSubmit={handleSubmit}>

<div className="row">

<div className="col-md-6 mb-3">

<label className="form-label">Title</label>

<input
type="text"
className="form-control"
placeholder="Enter Task Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
/>

</div>

<div className="col-md-6 mb-3">

<label className="form-label">Due Date</label>

<input
type="date"
className="form-control"
value={duedate}
onChange={(e)=>setDuedate(e.target.value)}
required
/>

</div>

</div>

<div className="mb-3">

<label className="form-label">Description</label>

<textarea
className="form-control"
rows="3"
placeholder="Task Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

</div>

<div className="row">

<div className="col-md-6 mb-3">

<label className="form-label">Priority</label>

<select
className="form-select"
value={priority}
onChange={(e)=>setPriority(e.target.value)}
>

<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>

</select>

</div>

<div className="col-md-6 mb-3">

<label className="form-label">Status</label>

<select
className="form-select"
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="pending">Pending</option>
<option value="in_progress">In Progress</option>
<option value="completed">Completed</option>

</select>

</div>

</div>

<button
type="submit"
className="btn btn-primary"
>

<i className="bi bi-plus-circle me-2"></i>

Add Task

</button>

</form>

</div>

);

}

export default TaskForm;