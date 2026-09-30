import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter the name of the movie"],
        trim: true,
    },
    tmdbId:{
        type: String,
        required: [true, "Please enter the tmdbId of the movie"],
    },
    fileId:{
        type: String,
        required: [true, "Please enter the url of the movie"],
    }
},
    {
        timestamps: true,
    },
);

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
