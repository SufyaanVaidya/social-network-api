const { user, thoughts } = require("../models");

const createUser = (req, res) => {
    user.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  };

  const addFriend = (req, res) => {
    user.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((User) => {
        if (!User) {
          res.status(404).json({ message: "no user found with this id" });
        } else {
          res.json(User);
        }
      })
      .catch((err) => res.status(500).json(err));
  };

  const updateUser = (req, res) => {
    user.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((User) => {
        if (!User) {
          res.status(404).json({ message: "no user found with this id" });
        } else {
          res.json(User);
        }
      })
      .catch((err) => res.status(500).json(err));
  };

  const getSingleUser = (req, res) => {
    user.findOne({ _id: req.params._id })
      .populate("thoughts")
      .select("-__v")
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  };

  const getUsers = (req, res) => {
    user.find()
      .populate({ path: "thoughts", select: "_id" })
      .populate("friends")
      .select("-__v")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  const deleteUser = (req, res) => {
    user.findOneAndDelete({ _id: req.params._id })
      .then((User) => {
        !User
          ? res.status(404).json({ message: "No user w that id" })
          : thoughts.deleteMany({
              _id: { $in: User.Thoughts },
            });
        res.status(200).json({ message: "Sucessfully deleted" });
      })
      .catch((err) => res.status(500).json(err));
  };

  const deleteFriend = (req, res) => {
    user.findOneAndUpdate(
      { _id: req.params._id },
      { $pull: { friends: req.params.friendsId } },
      { new: true }
    )
      .then((User) => {
        if (User) {
          res.json({ message: "Friend successfully deleted" });
        } else {
          return res.status(404).json({ message: "no user with this id" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  module.exports = { createUser, addFriend, updateUser, getSingleUser, getUsers, deleteUser, deleteFriend };