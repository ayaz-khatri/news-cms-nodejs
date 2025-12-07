import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

newsSchema.plugin(mongoosePaginate);

// This will create model having above schema
const News = mongoose.model('News', newsSchema);
export default News;   // export the model for other files to use