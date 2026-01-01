class APIerror extends error{

    constructor(
        statusCode,
        message = 'Something went wrong',
        error = [],
        statck = "",

    ) {
        super(message);
        this.message = message
        this.statusCode = statusCode
        this.data = null
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack = statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {APIerror}