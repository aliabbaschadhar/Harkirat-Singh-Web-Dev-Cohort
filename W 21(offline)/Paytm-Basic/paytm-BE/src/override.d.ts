import 'express';

declare global {
    namespace Express {
        export interface Request {
            userId?: string,
        }
    }
}

export { }; // This makes the file a proper module