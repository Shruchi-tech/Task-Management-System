function TaskCard({ task, onDelete }) {

    return (

        <div
            style={{
                border: "1px solid gray",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
            }}
        >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
                <b>Due Date:</b> {task.duedate}
            </p>

            <p>
                <b>Priority:</b> {task.priority}
            </p>

            <p>
                <b>Status:</b> {task.status}
            </p>

            <button>Edit</button>

            <button
                onClick={() => onDelete(task.id)}
                style={{ marginLeft: "10px" }}
            >
                Delete
            </button>

        </div>

    );

}

export default TaskCard;