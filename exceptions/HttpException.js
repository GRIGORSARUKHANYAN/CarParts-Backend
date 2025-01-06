class HttpException extends Error {
  constructor(status, message, includeStackTrace = false) {
    super(message);
    this.status = status;
    this.message = message;
    this.includeStackTrace = includeStackTrace;
  }
}

export default HttpException;





// class HttpException extends Error {
//   constructor(status, message, includeStackTrace = false) {
//     super(message);
//     this.status = status;
//     this.includeStackTrace = includeStackTrace;

//     if (!includeStackTrace) {
//       this.stack = undefined; // Remove stack trace if not needed
//     }
//   }
// }

// module.exports = HttpException;
