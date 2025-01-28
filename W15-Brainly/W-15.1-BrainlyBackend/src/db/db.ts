import mongoose, { model, Schema, Types } from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const Connection = process.env.DBConnection;

if (!Connection) {
    throw new Error("Connection is not defined");
}

mongoose.connect(Connection.toString());

const contentTypes = ['image', 'video', 'article', 'audio'];

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
})

const contentSchema = new Schema({
    title: String,
    link: String,
    cType: { type: String, enum: contentTypes },
    tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
    userId: { type: Schema.Types.ObjectId, ref: 'users' }
})

const userModel = model('users', UserSchema);
const contentModel = model("contents", contentSchema);


export {
    userModel,
    contentModel,
}
