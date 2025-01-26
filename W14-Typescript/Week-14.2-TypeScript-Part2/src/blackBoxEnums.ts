// When are enums and where are they used?
// Enums in TypeScript are used to define a set of named values.
// They are useful when a variable can have one of a limited set of possible values.
// Enums are commonly used in switch statements, error handling, and state management.

// Example of an enum in TypeScript:
enum Color {
    Red,
    Green,
    Blue
}

// Usage of enum in a switch statement:
function getColorName(color: Color): string {
    switch (color) {
        case Color.Red:
            return 'Red';
        case Color.Green:
            return 'Green';
        case Color.Blue:
            return 'Blue';
        default:
            return 'Unknown';
    }
}

// Usage of enum in error handling:
enum ErrorCode {
    InvalidInput,
    NetworkError,
    ServerError
}

class CustomError extends Error {
    code: ErrorCode;

    constructor(code: ErrorCode, message: string) {
        super(message);
        this.code = code;
    }
}

// Usage of enum in state management:
enum State {
    Pending,
    InProgress,
    Completed
}

class Task {
    state: State;

    constructor(state: State) {
        this.state = state;
    }
}
