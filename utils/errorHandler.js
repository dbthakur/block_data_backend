
export class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Internal Server Error"
    });
};


