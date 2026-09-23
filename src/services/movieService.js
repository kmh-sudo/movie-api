const repo = require("../repositories/movieRepository");
const ApiError = require("../utils/ApiError");

exports.getById = async (id) => {
    const movie = await repo.findById(id);
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }
    return movie;
}

exports.create = async ({ name, url }) => {
    if (!url.startsWith("http")) {
        throw new ApiError(400, "URL must start with 'https://'");
    }
    const movie = await repo.create({ name, url });
    return movie;
}

exports.getMovie = async () => {
    const movie = await repo.findAll();
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }
    return movie;
}

exports.updateMovie = async (id, { name, url }) => {
    const movie = await repo.update(id, { name, url });
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }
    return movie;
}

exports.deleteMovie = async (id) => {
    const movie = await repo.delete(id);
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }
    return movie;
}