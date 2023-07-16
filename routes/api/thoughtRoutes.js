const router = require("express").Router();
const {
  getThoughts,
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  getAllReactions,
  removeReaction,
} = require("../../controllers/thoughtController.js");


router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


  router.route("/:thoughtId/reactionRoutes").get(getAllReactions).post(addReaction);

  router.route("/:thoughtId/reactionRoutes/:reactionId").delete(removeReaction);

module.exports = router;
