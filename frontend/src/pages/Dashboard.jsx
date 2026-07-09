import { useEffect, useState } from "react";
import { getTasks, deleteTask, getTaskStats } from "../services/api";
import "../styles/dashboard.css";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        highPriorityTasks: 0,
    });

    const fetchTasks = async () => {

        try {

            const res = await getTasks();

            setTasks(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const fetchStats = async () => {

        try {

            const res = await getTaskStats();

            setStats(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchTasks();
        fetchStats();

    }, []);

    const handleDelete = async (id) => {

        try {

            await deleteTask(id);

            fetchTasks();
            fetchStats();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="bg-light min-vh-100">

            <Navbar />

            <div className="container py-4">

                <div className="mb-4">

                    <h1 className="dashboard-title">
                        Dashboard
                    </h1>

                    <p className="dashboard-subtitle">
                        Manage your tasks efficiently.
                    </p>

                </div>

                {/* Statistics */}

                <div className="row g-4 mb-4">

                    <div className="col-lg-3 col-md-6">

                        <div className="card shadow-sm stats-card h-100">

                            <div className="card-body text-center">

                                <i className="bi bi-list-task text-primary fs-1"></i>

                                <h6 className="mt-2 text-muted">
                                    Total Tasks
                                </h6>

                                <h2 className="fw-bold text-primary">
                                    {stats.totalTasks}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card shadow-sm stats-card h-100">

                            <div className="card-body text-center">

                                <i className="bi bi-hourglass-split text-warning fs-1"></i>

                                <h6 className="mt-3 text-muted">
                                    Pending
                                </h6>

                                <h2 className="fw-bold text-warning">
                                    {stats.pendingTasks}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card shadow-sm stats-card h-100">

                            <div className="card-body text-center">

                                <i className="bi bi-check-circle-fill text-success fs-1"></i>

                                <h6 className="mt-3 text-muted">
                                    Complete
                                </h6>

                                <h2 className="fw-bold text-success">
                                    {stats.completedTasks}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="card shadow-sm stats-card h-100">

                            <div className="card-body text-center">

                                <i className="bi bi-exclamation-circle-fill text-danger fs-1"></i>

                                <h6 className="mt-2 text-muted">
                                    High Priority
                                </h6>

                                <h2 className="fw-bold text-danger">
                                    {stats.highPriorityTasks}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Add Task */}

                <div className="card shadow-sm form-card mb-5">

                    <div className="card-header bg-white">

                        <h4 className="mb-0">
                            Add New Task
                        </h4>

                    </div>

                    <div className="card-body">

                        <TaskForm
                            fetchTasks={() => {
                                fetchTasks();
                                fetchStats();
                            }}
                        />

                    </div>

                </div>

                {/* Task List */}

                <div className="tasks-heading">

                    <h3 className="mb-0">
                        My Tasks
                    </h3>

                    <span className="badge bg-primary fs-6">
                        {tasks.length} Tasks
                    </span>

                </div>

                {

                    tasks.length === 0 ?

                        <div className="alert alert-info shadow-sm">
                            No Tasks Found
                        </div>

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

            <footer className="footer">

                © Task Management 2026

            </footer>

        </div>

    );

}

export default Dashboard;