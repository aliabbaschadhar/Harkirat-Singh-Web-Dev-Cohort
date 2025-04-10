// When you have a configuration object that should not be altered after initialization, making it Readonly ensures its properties cannot be changed.

// Two different syntax of doing the same thing.

// ***************************** First **************************//
interface Config {
    readonly endpoint: string;
    readonly apiKey: string;
}

const config: Config = {
    endpoint: "https://api.examples.com",
    apiKey: "abcdefghijklmonpqrstuvwxyz"
};

config.apiKey = "newapikey"; // Error: Cannot assign to 'apiKey' because it is a read-only property
// **************************** Second **************************//

interface Config1 {
    endpoint: string,
    apiKey: string,
}


const config1: Readonly<Config1> = {
    endpoint: "https://api.examples.com",
    apiKey: "abcdefghijklmonpqrstuvwxyz"
}

// This is compile time checking, not runtime(unlike const)