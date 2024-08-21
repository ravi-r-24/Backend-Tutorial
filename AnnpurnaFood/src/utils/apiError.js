class APIError extends Error {
    constructor(
        statusCode,
        error = [],
        message = "Something went wrong",
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = error;
        this.name = "API Error";

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default APIError;
