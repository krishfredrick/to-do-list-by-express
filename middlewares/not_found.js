const notFound = (req,res) => res.status(404).json({msg:'Unknown'})


module.exports = notFound