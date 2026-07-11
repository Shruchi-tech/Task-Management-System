import { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/api";

function TaskForm({ fetchTasks, editingTask, setEditingTask }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDuedate] = useState("");
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("pending");

    useEffect(() => {

        if (editingTask) {

            setTitle(editingTask.title);
            setDescription(editingTask.description || "");
            setDuedate(editingTask.duedate?.split("T")[0] || editingTask.duedate);
            setPriority(editingTask.priority);
            setStatus(editingTask.status);

        } else {
    
            resetForm();

       }

    }, [editingTask]);

    const resetForm = () => {

        setTitle("");
        setDescription("");
        setDuedate("");
        setPriority("medium");
        setStatus("pending");
        setEditingTask(null);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const taskData = {
                title,
                description,
                duedate,
                priority,
                status,
            };

            if (editingTask) {

                await updateTask(editingTask.id, taskData);

                alert("Task Updated Successfully");

            } else {

                await createTask(taskData);

                alert("Task Added Successfully");

            }

            resetForm();

            fetchTasks();

        } catch (err) {

            console.log(err);

            alert(err.response?.data?.message || "Something went wrong");

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Title
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Due Date
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={duedate}
                        onChange={(e) => setDuedate(e.target.value)}
                        required
                    />

                </div>

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Description
                </label>

                <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </div>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Priority
                    </label>

                    <select
                        className="form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >

                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>

                    </select>

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Status
                    </label>

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>

                    </select>

                </div>

            </div>

            <button
                type="submit"
                className={`btn ${editingTask ? "btn-success" : "btn-primary"}`}
            >

                <i className={`bi ${editingTask ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>

                {editingTask ? "Update Task" : "Add Task"}

            </button>

            {

                editingTask && (

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={resetForm}
                    >

                        Cancel

                    </button>

                )

            }

        </form>

    );

}

export default TaskForm;