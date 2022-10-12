const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,  
  createThought,
  updateThoughtById,
  deleteThoughtById
  // createReaction,
  // deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
.route('/')
.get(getAllThought)
.post(createThought);

//api/thoughts/:thoughtsId
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThoughtById)
.delete(deleteThoughtById);

// /api/thoughts/:thoughtId/reactions/reactionId
// router.
// route('/:thoughtId/reactions/:reactionId')
// .post(createReaction)
// .delete(deleteReaction);

module.exports = router;