
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Bapastunnig";

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJWT(username, password) {
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if (!usernameResponse.success || !passwordResponse.success) {
        return null;
    }

    const signature = jwt.sign({ username: username }, JWT_SECRET);

    return signature;
}

function decodedJWT(token) {
    const decoded = jwt.decode(token);
    if (decoded) {
        return true;
    } else {
        return false;
    }
}

function verifyJWT(token) {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        console.log(error)
    }
    return false;
}

const ans = signJWT("harkajrata@gmail.com", "15298aafjlka");
const ans2 = decodedJWT(ans);
console.log(ans2)

// Add this to test the verifyJWT function
const ans3 = verifyJWT(ans);
console.log(ans3);
