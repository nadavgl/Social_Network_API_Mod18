const router = require('express').Router();
const thoughtController = require('../controllers/thought_controller');
const userController = require('../controllers/user_controller');

// User Routes

// GET all users
router.get('/users', userController.getAllUsers);

// GET a single user by its _id and populate thought and friend data
router.get('/users/:id', userController.getSingleUser);

// POST a new user
router.post('/users', userController.createUser);

// PUT to update a user by its _id
router.put('/users/:id', userController.updateUser);

// DELETE to remove a user by its _id
router.delete('/users/:id', userController.deleteUser);

// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', userController.addFriend);

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', userController.deleteFriend);

// Thought Routes

// GET to get all thoughts
router.get('/thoughts', thoughtController.getAllThoughts);

// GET to get a single thought by its _id
router.get('/thoughts/:id', thoughtController.getSingleThought);

// POST to create a new thought and push the thought's _id to the associated user's thoughts array field
router.post('/thoughts', thoughtController.createThought);

// PUT to update a thought by its _id
router.put('/thoughts/:id', thoughtController.updateThought);

// DELETE to remove a thought by its _id
router.delete('/thoughts/:id', thoughtController.deleteThought);

// Reaction Routes

// POST to create a reaction stored in a single thought's reactions array field
router.post('/thoughts/:thoughtId/reactions', thoughtController.addReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;
