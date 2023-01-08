const errorHandlerMiddleware = (err,res,req,next)=>{
    return res.status(500).json({msg:err})
}

module.exports = errorHandlerMiddleware;