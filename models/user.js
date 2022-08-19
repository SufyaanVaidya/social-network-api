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
        validate: {
            validator: function (email) {
              return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
            },
          },
          message: "Please Enter A Valid Email.",
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
);

userSchema.virtual("friendCount").get(function () {

    return this.friends.length;
  });

  const user = mongoose.model("user", userSchema);

  const handleError = (err) => console.error(err);

  user.find({}).exec((err, collection) => {
    if (collection.length == 0) {
      user.insertMany(
        [
          { 

            username: "jerome", 
            email: "jerome@gmail.com"
         
          },
          {

            username: "vince",
            email: "vince@gmail.com",

          },
          {

            username: "kevin",
            email: "kevin@gmail.com",

          },
          {

            username: "manuel",
            email: "manuel@gmail.com",

          },
        ],
        (insertErr) => {
          if (insertErr) {
            handleError(insertErr);
          }
        }
      );
    }
  });

  module.exports = user;