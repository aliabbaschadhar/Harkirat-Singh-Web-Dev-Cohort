import { configDotenv } from "dotenv";
import mongoose, { Model, model, Schema, Types } from "mongoose";

configDotenv();

const Connection = process.env.DB_URL;

if (Connection) {
    mongoose.connect(Connection?.toString());
} else {
    throw new Error("Connection is not defined!")
}

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLenght: 6,
    },
    firstName: {
        type: String,
        required: true,
        tirm: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        tirm: true,
        maxLength: 50,
    },
})

const userModel = model("users", UserSchema);


export { userModel };