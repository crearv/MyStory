const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => { console.log("auth back controllers");
    try { 
        //récupère le token
       const token = req.headers.authorization.split(' ')[1];
       //decode le token
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       //recupère user id
       const userId = decodedToken.userId;
       //transmet user aux routes suivantes
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};