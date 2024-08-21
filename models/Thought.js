const { ObjectId } = require('bson');
const { model, Schema } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    username: {
        type: String,
        required: true
    },

    reactions: [
        reactionSchema
    ]

}, {

    toJSON: {
        getters: true
    }
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;