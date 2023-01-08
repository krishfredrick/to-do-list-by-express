const Task = require('../models/tasks')
const asyncWrapper = require('../middlewares/async')

// it get the value every value in db so it is get
const getAllTasks = asyncWrapper(async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }catch (err){
        res.status(501).json({msg: err})
    }
})

// it creates the data of the schema in db so it is post
const createTask = async (req,res) =>{
    //one way to do const task = await Task.create({name:'first task'})
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})

    }catch(err){
        res.status(400).send({
            message: err, 
        })
    }
}

// it get the params has hashID  l
const getTask = async (req,res) =>{
    try{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
    }catch (err){
        res.status(501).json({msg:err})
    }
}

// This controller use the delete method
const deleteTask = async(req,res) =>{
    try {
        const {id:taskID} = req.params;
        const task = await Task.findByIdAndDelete({_id: taskID})
        
        if(!task){
            return res.status(404).json({msg: `There is no id matching : ${taskID}`})
        }

        return res.status(200).json({task})
    } catch (err) {
        return res.status(501).json({msg:e})
    }
}

const updateTask = async(req,res) =>{

    res.send('update task')

    try {
        const {id:taskID} = req.params;
        console.log(req.params)

        const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new: true,
            runValidators: true,

        })

        if(!task){
            return req.status(400).send({
                msg: `No task with id:${taskID}`
            })
        }
        res.status(200).json({task})
    } catch (err) {
        res.status(500).json({msg: err})        
    }
}

const editTask = async (req, res)=>{
    
    res.send('update task')

    try {
        const {id:taskID} = req.params;
        console.log(req.params)

        const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new: true,
            runValidators: true,
            overwrite:true,

        })

        if(!task){
            return req.status(400).send({
                msg: `No task with id:${taskID}`
            })
        }
        res.status(200).json({task})
    } catch (err) {
        res.status(500).json({msg: err})        
    }

}


module.exports ={
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    editTask
}