const mongoose = require('mongoose');

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
        },
        username: {
            type: String,

        },
        reactions: {

        },
    },
    {
        toJSON: {
          getters: true,
        },
      }
);

const thoughts = mongoose.model('Thoughts', thoughtsSchema);

thoughts.find({}).exec((err, collection) => {
    if (collection.length == 0) {
        thoughts.insertMany(
            [
                {
                    thoughtText: 'hello world',
                    username: 'jerome',
                    reactions:[{}],
                },
                {
                    thoughtText: 'hello jerome',
                    username: 'vince',
                    reactions:[{}],
                }
            ],

            (insertErr) => {
                if (insertErr) {
                    console.log(insertErr)
                }
            }
        )
    }
});

module.exports = thoughts;