const  mongoose = require('mongoose');
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = mongoose.model("Thought", thoughtSchema)

module.exports = Thought;
