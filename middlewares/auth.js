var {getUser, setUser} = require('../service/auth')
async function checkUser(req, res, next) {
    var uuid = req.cookies?.uuid
    if(!uuid) return res.redirect('/login');
    var user = getUser(uuid)
    if(!user) return res.redirect('/login');
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uuid;
    console.log('userid', userUid)
    const user = getUser(userUid);
  
    req.user = user;
    next();
}
  
module.exports = {checkUser, checkAuth}