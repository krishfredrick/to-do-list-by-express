const mongoose = require('mongoose')

/** we are connecting the db in function because we are planning 
 * kill the server if the db connection fails
 */
const connectDB = (url)=>{
    mongoose.set('strictQuery', false);
   return mongoose.connect(url,{
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
    })

}

module.exports = connectDB