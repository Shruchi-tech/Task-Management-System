import { useEffect, useState } from "react";
import {
    getTasks,
    deleteTask,
    getTaskStats,
    markComplete,
     getTodayTasks,
    getOverdueTasks
} from "../services/api";

import "../styles/dashboard.css";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
   const [todayTasks, setTodayTasks] = useState([]);

const [overdueTasks, setOverdueTasks] = useState([]);
const [statusFilter, setStatusFilter] = useState("");

const [priorityFilter, setPriorityFilter] = useState("");

const [sortOrder, setSortOrder] = useState("ASC"); 

    const [editingTask, setEditingTask] = useState(null);

    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        highPriorityTasks: 0,
    });

    const fetchTasks = async () => {

        try {

            const res = await getTasks({
         search,
         status: statusFilter,
         priority: priorityFilter,
         sort: sortOrder,
         });

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
    const fetchTodayTasks = async () => {

    try {

        const res = await getTodayTasks();

        setTodayTasks(res.data);

    } catch (err) {

        console.log(err);

    }

};

const fetchOverdueTasks = async () => {

    try {

        const res = await getOverdueTasks();

        setOverdueTasks(res.data);

    } catch (err) {

        console.log(err);

    }

};
    useEffect(() => {

      fetchTasks();
      fetchStats();
      fetchTodayTasks();
      fetchOverdueTasks();

     }, [search, statusFilter, priorityFilter, sortOrder]);

      useEffect(() => {

        fetchStats();

     }, []);

    const handleDelete = async (id) => {

        try {

            await deleteTask(id);

            fetchTasks();
            fetchStats();
            fetchTodayTasks();
            fetchOverdueTasks();

        } catch (err) {

            console.log(err);

        }

    };

    const handleEdit = (task) => {

        setEditingTask(task);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    const handleComplete = async (id) => {

        try {

            await markComplete(id);

            fetchTasks();
           fetchStats();
            fetchTodayTasks();
           fetchOverdueTasks();

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
                <div className="row mb-4">

    <div className="col-md-6">

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

                <h5 className="text-primary">

                    Today's Tasks

                </h5>

                <h1>

                    {todayTasks.length}

                </h1>

            </div>

        </div>

    </div>

    <div className="col-md-6">

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

                <h5 className="text-danger">

                    Overdue Tasks

                </h5>

                <h1>

                    {overdueTasks.length}

                </h1>

            </div>

        </div>

    </div>

</div>
                {/* Task Form */}

                <div className="card shadow-sm form-card mb-5">

                    <div className="card-header bg-white">

                        <h4 className="mb-0">

                            {editingTask ? "Edit Task" : "Add New Task"}

                        </h4>

                    </div>

                    <div className="card-body">

                        <TaskForm
                            editingTask={editingTask}
                            setEditingTask={setEditingTask}
                            fetchTasks={() => {
                                fetchTasks();
                                fetchStats();
                            }}
                        />

                    </div>

                </div>
                 {/* Search / Filter / Sort */}

<div className="card shadow-sm border-0 mb-4">

    <div className="card-body">

        <div className="row g-3">

            <div className="col-lg-4">

                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="col-lg-3">

                <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

            </div>

            <div className="col-lg-3">

                <select
                    className="form-select"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

            </div>

            <div className="col-lg-2">

                <select
                    className="form-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="ASC">Due Date ↑</option>
                    <option value="DESC">Due Date ↓</option>
                </select>

            </div>

        </div>

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
                                onEdit={handleEdit}
                                onComplete={handleComplete}
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