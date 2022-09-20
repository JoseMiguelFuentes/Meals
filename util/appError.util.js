
function appError (message,statusCode){
  Error.call(this,message)
  this.status = statusCode.toString().startsWith('4') ?  'error' : 'fail'
  this.message = message
  this.statusCode = statusCode
// Capture the error stack and add it to the AppError instance
  Error.captureStackTrace(this)
}
/*
class appError extends Error{
  constructor(message,statusCode){
    super(message)

    this.status = statusCode.toString().startsWith('4') ?  'error' : 'fail'
    this.message = message
    this.statusCode = statusCode

    Error.captureStackTrace(this)
  }
  
}
*/




module.exports = {appError}