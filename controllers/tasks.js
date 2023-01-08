const Task = require('../models/tasks')
const asyncWrapper = require('../middlewares/async')

// it get the value every value in db so it is get
const getAllTasks = asyncWrapper(async (req,res)=>{
  
    const tasks = await Task.find({})
    res.status(200).json({tasks})

})

// it creates the data of the schema in db so it is post
const createTask = asyncWrapper(async (req,res) =>{
    //one way to do const task = await Task.create({name:'first task'})
        const task = await Task.create(req.body)
        res.status(201).json({task})

   
})

// it get the params has hashID  l
const getTask = asyncWrapper( async (req,res) =>{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
    
})

// This controller use the delete method
const deleteTask = asyncWrapper(async(req,res) =>{
        const {id:taskID} = req.params;
        const task = await Task.findByIdAndDelete({_id: taskID})
        
        if(!task){
            return res.status(404).json({msg: `There is no id matching : ${taskID}`})
        }

        return res.status(200).json({task})
   
})

const updateTask = asyncWrapper(async(req,res) =>{

    res.send('update task')

    
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
   
})

const editTask = asyncWrapper(async (req, res)=>{
    
    res.send('update task')

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
    

})


module.exports ={
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    editTask
}