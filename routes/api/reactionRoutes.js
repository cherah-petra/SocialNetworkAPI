const express = require('express');
const router = express.Router();
const Thought = require('../../models/Thought');

router.post("/:thoughtId/reactionRoutes", async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const { reactionBody, username } = req.body;

        if (!thought) {
            return res.status(404).json({ error: "Thought was not found"});
        }

        thought.reactionRoutes.push({ reactionBody, username});
        await thought.save();

        res.status(201).json(thought);
    } catch (err) {
        console.error("Error creation reaction:", err);
        res.status(500).json({ error: "Failed to create reaction" });
    }
});

router.delete("/:thoughtId/reactionRoutes/:reactionId", async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
  
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
  
      thought.reactionRoutes = thought.reactionRoutes.filter(
        (reaction) => reaction.id.toString() !== reactionId
      );
      await thought.save();
  
      res.status(200).json(thought);
    } catch (err) {
      console.error("Error deleting reaction:", err);
      res.status(500).json({ error: "Failed to delete reaction" });
    }
  });
  
  module.exports = router;