const { body, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");


const runvalidate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}

exports.valiDateCreate = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("url").isURL().withMessage("Valid url is required"),
    runvalidate
];
