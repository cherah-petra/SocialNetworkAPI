const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
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
  // Update a course
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
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.params.reactionId } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with that ID :(" });
        return;
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
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
};
