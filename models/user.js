const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
            
        },
        email: {
        type: String,
        required: true,
        unique: true,
        },
        thoughts: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "thoughts",
            },
          ],
        friends: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
            },
          ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)