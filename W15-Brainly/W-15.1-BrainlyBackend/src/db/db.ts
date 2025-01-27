import mongoose, { model, Schema, Types } from "mongoose";

mongoose.connect("mongodb+srv://admin:KrxTrwBKvcLhkX2S@cluster0.txbhf.mongodb.net/second-brain")

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
})

const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
    userId: { type: Schema.Types.ObjectId, ref: 'users' }
})

const userModel = model('users', UserSchema);
const contentModel = model("contents", contentSchema);


export {
    userModel,
    contentModel,
    contentSchema,
}
