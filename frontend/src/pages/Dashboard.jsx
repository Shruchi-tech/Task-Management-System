import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/api";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {

        try {

            const res = await getTasks();

            setTasks(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchTasks();

    }, []);

    const handleDelete = async (id) => {

        try {

            await deleteTask(id);

            fetchTasks();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <Navbar />

            <h1>Task Dashboard</h1>

            <TaskForm fetchTasks={fetchTasks} />

            <hr />

            {
                tasks.length === 0 ?

                    <h3>No Tasks Found</h3>

                    :

                    tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={handleDelete}
                        />

                    ))
            }

        </div>

    );

}

export default Dashboard;