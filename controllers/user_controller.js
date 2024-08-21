const { User, Thought } = require('../models');

const userController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single user by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a user by _id
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user by _id
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            // Optionally remove associated thoughts
            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a friend to user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a friend from user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            ).populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
