const router = require('express').Router();

const {
  getAllThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReactions,
} = require('../../controllers/thoughtController');

// /thoughts
router.route('/').get(getAllThought).post(createThought);

// /thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReactions);

module.exports = router;