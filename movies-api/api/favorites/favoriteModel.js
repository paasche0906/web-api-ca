import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteMovieSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    movieId: { type: Number, required: true },
    title: { type: String, required: true }, 
    posterPath: { type: String },
    addedAt: { type: Date, default: Date.now }
});

export default mongoose.model('FavoriteMovie', FavoriteMovieSchema);
