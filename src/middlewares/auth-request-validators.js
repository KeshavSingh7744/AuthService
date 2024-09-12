
const validateUserAuth = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Please provide email and password",
            success : false,
            data : {},
            err : 'Email or password Missing in request'

        })
    } 
    next();
}

const validateIsAdmin = (req, res, next)=>{
    if(!req.body.userId){
        return res.status(400).json({
            message: "Please provide userId",
            success : false,
            data : {},
            err : 'userId Missing in request'

        })
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdmin
}
