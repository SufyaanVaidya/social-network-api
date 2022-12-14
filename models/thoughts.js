const mongoose = require('mongoose');
const { Types } = require("mongoose");
const moment = require('moment');

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

const thoughtsSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,

        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
        },
      }
);

const thoughts = mongoose.model('thoughts', thoughtsSchema);

thoughts.find({}).exec((err, collection) => {
    if (collection.length == 0) {
        thoughts.insertMany(
            [
                {
                    thoughtText: 'hello world',
                    username: 'jerome',
                    reactions:[{ reactionBody: 'hi there', username: 'kevin'}],
                },
                {
                    thoughtText: 'hello manuel',
                    username: 'vince',
                    reactions:[{ reactionBody: 'hi there', username: 'manuel'}],
                }
            ],

            (insertErr) => {
              if (insertErr) {
                handleError(insertErr);
                }
            }
        )
    }
});

module.exports = thoughts;