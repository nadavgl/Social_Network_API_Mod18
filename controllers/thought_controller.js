const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: newThought._id } },
                { new: true }
            );
            res.json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought by _id
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought by _id
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.id);
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            // Remove the thought from the user's thought array
            await User.findOneAndUpdate(
                { username: deletedThought.username },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            );

            res.json({ message: 'Thought and associated reactions deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a reaction from a thought
    async deleteReaction(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;
