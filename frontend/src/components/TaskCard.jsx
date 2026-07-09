function TaskCard({ task, onDelete }) {
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
                        {task.priority}
                    </span>

                </div>

                <p className="text-muted mt-3">
                    {task.description || "No Description"}
                </p>

                <div className="row">

                    <div className="col-md-4">
                        <strong>Due Date</strong>
                        <br />
                        {task.duedate}
                    </div>

                    <div className="col-md-4">
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

                    <div className="col-md-4 text-end">

                        <button
                            className="btn btn-warning btn-sm"
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TaskCard;