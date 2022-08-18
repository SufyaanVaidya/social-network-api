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
    }
);

const thoughts = mongoose.model('Thoughts', thoughtsSchema);