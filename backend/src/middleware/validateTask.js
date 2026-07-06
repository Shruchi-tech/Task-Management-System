const validateTask=(req,res,next)=>{

    const {title,duedate,priority,status}=req.body;

    if(!title || !duedate || !priority || !status){

        return res.status(400).json({
            message:"Please fill all required fields"
        });

    }

    next();

};

module.exports=validateTask;