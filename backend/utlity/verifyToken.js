const jwt = require('jsonwebtoken');
const verifyToken = async(req,res,next)=>{
console.log(req.headers.token);
const token = req.headers.token
console.log(token)
jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            req.user = undefined;
            res.status(401).json({message:"not authorized"})
        }else{
            req.user = decode
           next()
        }
   
})
}

const verifyTokenAdmin = async(req,res,next)=>{
console.log('admin')
}

module.exports = {
    verifyToken,
    verifyTokenAdmin
}