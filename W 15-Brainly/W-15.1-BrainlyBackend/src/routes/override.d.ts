// Extending the Express Request interface with a new property("userId")
declare global {
    namespace Express {
        // The request interface from the express module is being extended here
        export interface Request {
            userId?: string; // Adds an optional property to the Request object.
        }
    }
}
