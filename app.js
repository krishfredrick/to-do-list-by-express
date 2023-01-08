const express = require('express')
const app = express();
const connectDB = require('./db/connect')
require('dotenv').config()
const tasks = require('./routes/tasks')
const notfound = require('./middlewares/not_found');
const notFound = require('./middlewares/not_found');
const errorHandlerMiddleware = require('./middlewares/err-handler.js')
// middleware
app.use(express.json())
app.use(express.static('./public'))
app.use(notFound)


// routes
app.get('/hello', (req,res)=>{
    res.send('Task Manger App')
})


// app.get('/api/v1/tasks')         - get all the tasks
app.use('/api/v1/tasks', tasks)

app.use(errorHandlerMiddleware)

const port = process.env.PORT
const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`Server is running ${port}....`)
        })
        
    }catch (err){
        console.log(err)
    }
}

start()