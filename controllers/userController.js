const { ObjectID } = require('mongoose').Types;
const { User } = require("../models");

const userCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
}


module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-__v');
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
        return;
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        res.status(404).json({ message: "No such user exists" });
        return;
      }

      res.status(200).json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const id= req.params.userId;      
      const { username, email } = req.body;
      const updateUser = await User.findByIdAndUpdate(
        id,
        { username, email },
        { new: true }
      );
      if (!updateUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updateUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user found with that ID :(" });
        return;
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends:  req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res
          .status(404)
          .json({ message: "No user found with that ID :(" });
          return;
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
};
