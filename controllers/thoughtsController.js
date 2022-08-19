
const { thoughts, user } = require("../models");

const createThought = (req, res) => {
    thoughts.create(req.body)
      .then((Thought) => {
        return user.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { Thoughts: Thought._id } },
          { new: true }
        );
      })
      .then((User) => {
        if (User) {
          res.json({ message: "successfully created thought" });
        } else {
          res.status(404).json({ message: "no user with this thought!" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  };

  const createReaction = (req, res) => {
    thoughts.findOneAndUpdate(
      { _id: req.params._id },
      {
        $push: {
          reactions: req.body,
        },
      },
      { runValidators: true, new: true }
    )
      .then((Thought) => {
        if (Thought) {
          res.json(Thought);
        } else {
          res.status(404).json({ message: "No thought w this id" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  const getSingleThought = (req, res) => {
    thoughts.findOne({ _id: req.params._id })
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  };

  const getThoughts = (req, res) => {
    thoughts.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json(err);
      }
    });
  };

  const deleteThought = (req, res) => {
    thoughts.findOneAndDelete({ _id: req.params._id })
    .then((Thought) => {
      if (!Thought) {
        res.status(404).json({ message: "No thought w that id" });
      }
      return user.findOneAndUpdate(
        { Thoughts: req.params._id },
        { $pull: { Thoughts: req.params._id } },
        { new: true }
      )
        .then((User) => {
          if (User) {
            res.json({ message: "Thought successfully deleted" });
          } else {
            return res.status(404).json({ message: "no user with this id" });
          }
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  };

  const deleteReaction = (req, res) => {
    console.log(req.params._id, req.params.reactionId);
    thoughts.findOneAndUpdate(
      { _id: req.params._id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  };

  module.exports = { createThought, createReaction, getSingleThought , getThoughts , deleteThought , deleteReaction }