const db = require("../db/db");

// Create Task
const createTask = (req, res) => {
        const { title, description, duedate, priority, status } = req.body;

    if (!title || !duedate || !priority || !status) {
    return res.status(400).json({
        message: "All required fields are mandatory"
    });
   }


    const userid = req.user.id;

    const sql = `
    INSERT INTO task
    (userid, title, description, duedate, priority, status)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [userid, title, description, duedate, priority, status],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Server Error",
                });
            }

            res.status(201).json({
                message: "Task Created Successfully",
                taskId: result.insertId

            });

        }
    );
};

// Get All Tasks
const getTasks = (req, res) => {

    const userid = req.user.id;

    const {
        search,
        status,
        priority,
        page = 1,
        limit = 5,
        sort = "ASC"
    } = req.query;

    let sql = "SELECT * FROM task WHERE userid=?";
    let values = [userid];

    if (search) {
        sql += " AND title LIKE ?";
        values.push(`%${search}%`);
    }

    if (status) {
        sql += " AND status=?";
        values.push(status);
    }

    if (priority) {
        sql += " AND priority=?";
        values.push(priority);
    }
    const sortOrder = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";
    sql += ` ORDER BY duedate ${sortOrder}`;
    
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const offset = (pageNum - 1) * limitNum;

    sql += " LIMIT ? OFFSET ?";

    values.push(Number(limitNum));
    values.push(Number(offset));

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Server Error"
            });
        }

        res.json(result);

    });

};

// Update Task
const updateTask = (req, res) => {

    const { id } = req.params;

    const { title, description, duedate, priority, status } = req.body;
    if (!title || !duedate || !priority || !status) {
    return res.status(400).json({
        message: "All required fields are mandatory"
    });
}
    const userid = req.user.id;

    const sql = `
    UPDATE task
    SET
    title=?,
    description=?,
    duedate=?,
    priority=?,
    status=?
    WHERE id=? AND userid=?
    `;

    db.query(
        sql,
        [
            title,
            description,
            duedate,
            priority,
            status,
            id,
            userid
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Server Error"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task Not Found"
                });
            }

            res.json({
                message: "Task Updated Successfully"
            });

        }
    );

};

// Delete Task
const deleteTask = (req, res) => {

    const { id } = req.params;

    const userid = req.user.id;

    const sql = "DELETE FROM task WHERE id=? AND userid=?";

    db.query(sql, [id, userid], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Server Error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }

        res.json({
            message: "Task Deleted Successfully"
        });

    });

};
//task statistics
const getTaskStats = (req, res) => {

    const userid = req.user.id;

    const sql = `
    SELECT
    COUNT(*) AS totalTasks,
    COALESCE(SUM(status='completed'),0) AS completedTasks,
    COALESCE(SUM(status='pending'),0) AS pendingTasks,
    COALESCE(SUM(status='in_progress'),0) AS inProgressTasks,
    COALESCE(SUM(priority='high'),0) AS highPriorityTasks
    FROM task
    WHERE userid=?
    `;

    db.query(sql,[userid],(err,result)=>{

        if(err){
            console.log(err);
            return res.status(500).json({
                message:"Server Error"
            });
        }

        res.json(result[0]);

    });

};
// today task
const getTodayTasks = (req,res)=>{

    const userid=req.user.id;

    const sql=`
    SELECT *
    FROM task
    WHERE userid=?
    AND duedate=CURDATE()
    `;

    db.query(sql,[userid],(err,result)=>{

        if(err){
            return res.status(500).json({
                message:"Server Error"
            });
        }

        res.json(result);

    });

};
//overdue tasks
const getOverdueTasks=(req,res)=>{

    const userid=req.user.id;

    const sql=`
    SELECT *
    FROM task
    WHERE userid=?
    AND duedate<CURDATE()
    AND status!='completed'
    `;

    db.query(sql,[userid],(err,result)=>{

        if(err){
            return res.status(500).json({
                message:"Server Error"
            });
        }

        res.json(result);

    });

};
// mark the task complete
const markComplete=(req,res)=>{

    const {id}=req.params;

    const userid=req.user.id;

    const sql=`
    UPDATE task
    SET status='completed'
    WHERE id=? AND userid=?
    `;

    db.query(sql,[id,userid],(err,result)=>{

        if(err){
            return res.status(500).json({
                message:"Server Error"
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }
        res.json({
            message:"Task Completed"
        });

    });

};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskStats,
    getTodayTasks,
    getOverdueTasks,
    markComplete
};