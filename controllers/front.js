exports.deleteStory = async (req, res, next) => { console.log("deleteStory front controllers");
    const apiUrl = process.env.API_URL+'/supprimer';
    console.log(req.session.authToken);
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${req.session.authToken}`
            },
            body: JSON.stringify({story: req.body}),
        });

        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }

        const data = await response.json();

        res.redirect('/accueil'); // Passer les données au template EJS
    } catch (error) {
        res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
    }
};

exports.modifyStory = async (req, res, next) => { console.log("modifyStory front controllers");
    const apiUrl = process.env.API_URL+'/modifier';
    const apiUrl2 = process.env.API_URL+'/getOneId/'+req.body.id;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${req.session.authToken}`
            },
            body: JSON.stringify({story: req.body}),
        });

        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }

        const data = await response.json();

        console.log(req.session.authToken);
        try {
            const response = await fetch(apiUrl2, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${req.session.authToken}`
                },
                params: JSON.stringify({id: req.body.id}),
            });

            if (!response.ok) {
                throw new Error(`Erreur de requête : ${response.status}`);
            }

            const data = await response.json();

            res.render('story', { todos: data }); // Passer les données au template EJS
        } catch (error) {
            res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
        }
    } catch (error) {
        res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
    }
};

exports.modifyStoryForm = async (req, res, next) => { console.log("modifyStoryForm front controllers");
    const apiUrl = process.env.API_URL+'/getOneId/'+req.params.id;
console.log(req.session.authToken);
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${req.session.authToken}`
            },
            params: JSON.stringify({id: req.params.id}),
        });

        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }

        const data = await response.json();

        res.render('modifier', { todos: data }); // Passer les données au template EJS
    } catch (error) {
        res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
    }
};

exports.createStory = async (req, res, next) => { console.log("createStory front controllers");
    const apiUrl = process.env.API_URL+'/creer';
    console.log(req.session.authToken);
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${req.session.authToken}`
            },
            body: JSON.stringify({story: req.body}),
        });

        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }

        const data = await response.json();

        res.redirect('/accueil'); // Passer les données au template EJS
    } catch (error) {
        res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
    }
};

exports.createStoryForm = (req, res, next) => { console.log("createStoryForm front controllers");
    res.status(201).render('creer.ejs',{message:""});
};

exports.story = async (req, res, next) => { console.log("story front controllers");
    const apiUrl = process.env.API_URL+'/getOne';
    console.log(req.session.authToken);
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${req.session.authToken}`
              },
            body: JSON.stringify({title: req.body.select}),
        });

        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }

        const data = await response.json();

        res.render('story', { todos: data }); // Passer les données au template EJS
    } catch (error) {
        res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
    }
};

exports.accueil = async (req, res, next) => { console.log("accueil front controllers");
    const apiUrl = process.env.API_URL+'/';
    console.log(req.session.authToken);
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.session.authToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }

        const data = await response.json();
        res.render('accueil', { todolist: data }); // Passer les données au template EJS
    } catch (error) {
        res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
    }
};

exports.signup = async (req, res, next) => {console.log("signup valid controllers");
    const apiUrl = process.env.API_URL_AUTH+'/signup';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({mail: req.body.mail, mdp: req.body.mdp}),
        });
        //console.log(response);
        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }

        //const data = await response.json();
        res.redirect('/'); // Passer les données au template EJS
    } catch (error) {
        res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
    }
};

exports.signupForm = (req, res, next) => {console.log("signupForm front controllers");
    res.status(201).render('signup.ejs',{message:""});
};

exports.login = async (req, res, next) => {console.log("login front controllers");
    const apiUrl = process.env.API_URL_AUTH+'/login';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({mail: req.body.mail, mdp: req.body.mdp}),
        });

        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }

        const data = await response.json();

        req.session.authToken =  data.token;

        res.redirect('/accueil'); // Passer les données au template EJS

    } catch (error) {
        res.status(500).send('Erreur lors de l\'appel de l\'API : ' + error.message);
    }
};

exports.index = (req, res, next) => {console.log("index controllers");
    req.session.destroy((err) => {
        res.status(201).render('index.ejs',{message:""});
    })
    
};