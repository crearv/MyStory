const Story = require('../models/Story');

module.exports = (req, res, next) => { console.log("nbr back controllers");
    try { 
        Story.countDocuments({
            $or: [
              {userId: req.auth.userId},
            ]
          })
          .then(count => req.nbr = count)
          .catch(error => res.status(400).json({ error}));
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};