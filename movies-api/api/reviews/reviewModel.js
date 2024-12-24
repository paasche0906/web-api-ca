import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    movieId: { type: Number, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', ReviewSchema);
