import mongoose from 'mongoose';

const settingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
});

// This will create model having above schema
const Setting = mongoose.model('Setting', settingSchema);
export default Setting;   // export the model for other files to use