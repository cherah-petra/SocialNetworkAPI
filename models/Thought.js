const  mongoose = require('mongoose');
const reactionSchema =require("./reaction")
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: time => dateFormat(time)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = mongoose.model("Thought", thoughtSchema)

Thought.virtual("reactionCount").get(function() {
  return this.reactions.length
})

module.exports = Thought;
