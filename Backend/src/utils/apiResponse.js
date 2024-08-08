class APIResponse {
  constructor(statusCode, responseData, message = "Success") {
    this.statusCode = statusCode;
    this.responseData = responseData;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default APIResponse;
