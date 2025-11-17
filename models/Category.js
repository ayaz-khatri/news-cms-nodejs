import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'author'],
        default: 'author',
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// This will create model having above schema
const Category = mongoose.model('Category', categorySchema);
export default Category;   // export the model for other files to use