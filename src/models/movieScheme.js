const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter the name of the movie"],
        trim: true,
    },
    url:{
        type: String,
        required: [true, "Please enter the url of the movie"],
    }
},
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Movie", movieSchema);