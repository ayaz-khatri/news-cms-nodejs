import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending',
        required: true
    },
}, { timestamps: true });

// This will create model having above schema
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;   // export the model for other files to use