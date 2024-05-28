const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.signup = (req, res, next) => { console.log("signup back controller");
    bcrypt.hash(req.body.mdp, 10)//crypte(mdp, nbr de boucle de cryptage)
        .then(hash => {
        const user = new User({
            email: req.body.mail,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => { console.log("login back controller");
    //cherche le login, mdp
    User.findOne({ email: req.body.mail })
       .then(user => {
            //si login inconnu
           if (!user) {
               return res.status(401).json({ message: 'Paire login/mot de passe incorrecte (user)'});
           }
           //compare les mdp
           bcrypt.compare(req.body.mdp, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                    //renvoie un token si ok
                   res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id }, //partie encodé
                            process.env.JWT_KEY, //clé
                            { expiresIn: '24h' } //durée
                        )
                    });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};