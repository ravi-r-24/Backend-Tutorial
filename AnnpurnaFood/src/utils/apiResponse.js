class APIResponse {
    constructor(statusCode, data, message = "Successful", success) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export default APIResponse;
