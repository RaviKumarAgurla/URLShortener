var {getUser, setUser} = require('../service/auth')

function checkAuthentication(req, res, next) {
    var cookieToken = req.cookies?.uuid;
    if(!cookieToken) return next()
    var token = cookieToken;
    
    var user = getUser(token);
    req.user = user
    return next()
}

function restrictToRole(roles=[]){
    return function (req, res, next) {
        if(!req.user) return res.redirect('/login');
        if(!roles.includes(req.user.role)) res.end('unauthorized')
        next()
    }
}
  
module.exports = {checkAuthentication, restrictToRole}