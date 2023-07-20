const { User, Thought } = require('../models');

module.exports = {
  async getAllThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }

      res.status(200).json({ message: 'Thought deleted!' });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.status(201).json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
  async removeFriend(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reactionRoutes: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
          return;
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async removeReactions(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactionRoutes: { reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
  async getAllReactions(req, res) {
    try {
      const { thoughtId } = req.params;
      // Find the thought by ID and populate the reactions field
      const thought = await Thought.findById(thoughtId).populate("reactionRoutes");
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      const reactionRoutes = thought.reactionRoutes;
      res.json(reactionRoutes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};