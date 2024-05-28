const Story = require('../models/Story');

exports.deleteStory = (req, res, next) => { console.log("deleteStory back controllers");
  const storyObject = req.body;
  
  Story.findOne({_id: req.body.story.id})
      .then((story) => {
          //verifie si id = id du token
          if (story.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
          } else {
            Story.deleteOne({ _id: req.body.story.id}) 
              .then(() => res.status(201).json({ message: 'Objet supprimer !'}))  
              .catch(error => res.status(401).json({ error }));
          }
        })
      .catch(error =>  res.status(400).json({ error }));
};

exports.modifyStory = (req, res, next) => { console.log("modifyStory back controllers");
  const storyObject = req.body.story;

  Story.findOne({_id: req.body.story.id})
      .then((story) => {
          //verifie si id = id du token
          if (story.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
          } else {
          Story.updateOne({ _id: req.body.story.id}, { ...storyObject, _id: req.body.story.id, title: req.body.story.titre, histoire: req.ai})
            .then(() => res.status(201).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
          }
        })
      .catch(error =>  res.status(400).json({ error }));
};

exports.createStory = (req, res, next) => { console.log("createStory back controllers");
console.log(req.nbr);
  if(req.nbr >= process.env.NBR_STORY) {
    res.status(400).json({ error });
  }
  else {
    const storyObject = req.body.story;

    const story = new Story({
        title:req.body.story.titre,
        userId: req.auth.userId, //recupère l'id du token
        histoire:req.ai,
        ...storyObject,
    });

    story.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
  }
  
};

exports.getOneId = (req, res, next) => { console.log("getOneId back controllers");
  Story.findOne({ _id: req.params.id})
    .then(storys => res.status(200).json(storys))
    .catch(error => res.status(400).json({ error}));
};

exports.getOne = (req, res, next) => { console.log("getOne back controllers");
    Story.findOne({ title: req.body.title })
      .then(storys => res.status(200).json(storys))
      .catch(error => res.status(400).json({ error}));
};

exports.getAllStory = (req, res, next) => { console.log("accueil back controllers");
    Story.find({
        $or: [
          {userId: ""},
          {userId: req.auth.userId},
        ]
      })
      .then(storys => res.status(200).json(storys))
      .catch(error => res.status(400).json({ error}));
};
