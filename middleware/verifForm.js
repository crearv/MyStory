const { check, validationResult, matchedData } = require('express-validator');

module.exports = (req, res, next) => { console.log("verif form back controllers");
  	[
		check('titre')
			.isLength({ min: 1 }),
		check('heros')
			.isLength({ min: 1 }),
		check('mechant')
			.isLength({ min: 1 }),
        check('lieu')
			.isLength({ min: 1 }),
	]
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		next();
	} else {
		res.render('/', {
			errors: errors.array(),
		});
	}
};