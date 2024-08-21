const { model, Schema } = require('mongoose');

const userSchema = new Schema({
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
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
        transform(doc, jsonVal) {
            delete jsonVal.__v;
            return jsonVal;
        }
    },
    id: false
});

// Virtual property to get the number of friends a user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize User model
const User = model('User', userSchema);

module.exports = User;
