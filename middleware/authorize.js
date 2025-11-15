const authorize = (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization || authorization.split(" ")[0] !== 'Bearer'){
    console.log('Warning: Unauthorized');
    return res.status(401).json({success: false, message: 'Niste autorizovani!'});
  }
  next();
}

module.exports = authorize;