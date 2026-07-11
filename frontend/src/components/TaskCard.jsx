function TaskCard({ task, onDelete, onEdit, onComplete }) {

    const handleDelete = () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (confirmDelete) {
            onDelete(task.id);
        }

    };

    return (

        <div className="card shadow-sm border-0 mb-3">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                    <h5 className="fw-bold mb-0">
                        {task.title}
                    </h5>

                    <span
                        className={`badge ${
                            task.priority === "high"
                                ? "bg-danger"
                                : task.priority === "medium"
                                ? "bg-warning text-dark"
                                : "bg-success"
                        }`}
                    >
                        {task.priority.toUpperCase()}
                    </span>

                </div>

                <p className="text-muted mt-3">
                    {task.description || "No Description"}
                </p>

                <div className="row align-items-center">

                    <div className="col-md-3">

                        <strong>Due Date</strong>

                        <br />

                        {task.duedate?.split("T")[0] || task.duedate}

                    </div>

                    <div className="col-md-3">

                        <strong>Status</strong>

                        <br />

                        <span
                            className={`badge ${
                                task.status === "completed"
                                    ? "bg-success"
                                    : task.status === "pending"
                                    ? "bg-secondary"
                                    : "bg-primary"
                            }`}
                        >
                            {task.status}
                        </span>

                    </div>

                    <div className="col-md-6 text-end">

                        <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => onEdit(task)}
                        >
                            <i className="bi bi-pencil-square me-1"></i>
                            Edit
                        </button>

                        <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => onComplete(task.id)}
                            disabled={task.status === "completed"}
                        >
                            <i className="bi bi-check-circle me-1"></i>

                            {task.status === "completed"
                                ? "Completed"
                                : "Complete"}

                        </button>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={handleDelete}
                        >
                            <i className="bi bi-trash me-1"></i>
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TaskCard;