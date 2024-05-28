const express = require('express');

const router = express.Router();

const storyCtrl = require('../controllers/story');

const verif = require('../middleware/verifForm');
const auth = require('../middleware/auth');
const nbrStory = require('../middleware/nbrStory');
const OpenAI = require('../api/openai-test');

router.post('/supprimer', auth, storyCtrl.deleteStory);
router.post('/modifier', auth, verif, OpenAI, storyCtrl.modifyStory);
router.post('/creer', auth, verif, nbrStory, OpenAI, storyCtrl.createStory);
router.get('/getOneId/:id', auth, storyCtrl.getOneId);
router.post('/getOne', auth, storyCtrl.getOne);
router.get('/',auth, storyCtrl.getAllStory);


module.exports = router;