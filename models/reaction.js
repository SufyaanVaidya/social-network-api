const mongoose = require('mongoose');
const moment = require('moment');
const { createPromptModule } = require('inquirer');

const formatDate = (date) => {
    return moment(date).format('MMM Do, YYYY -- h:mm a');
};

const reactionSchema = new mongoose.Schema(
    {
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        max: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate,
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

module.exports = reactionSchema;