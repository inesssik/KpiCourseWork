class ApiError extends Error {
    public status: number;
    public message: string; 

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    public static badRequest(message: string){
        return new ApiError(404, message);
    }

    public static internal(message: string){
        return new ApiError(500, message);
    }

    public static forbidden(message: string = "Недостатньо прав!"){
        return new ApiError(403, message);
    }

    public static unauthorized(message: string = "Не авторизований!"){
        return new ApiError(401, message);
    }
}

export default ApiError;