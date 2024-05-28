const express = require('express');

const router = express.Router();

const frontCtrl = require('../controllers/front');

router.post('/supprimer', frontCtrl.deleteStory);
router.post('/modifier', frontCtrl.modifyStory);
router.post('/modifier/:id', frontCtrl.modifyStoryForm);
router.post('/creer', frontCtrl.createStory);
router.get('/creer', frontCtrl.createStoryForm);
router.post('/story', frontCtrl.story);
router.post('/signup', frontCtrl.signup);
router.get('/signup', frontCtrl.signupForm);
router.get('/accueil', frontCtrl.accueil);
router.post('/login', frontCtrl.login);
router.get('/', frontCtrl.index);

module.exports = router;