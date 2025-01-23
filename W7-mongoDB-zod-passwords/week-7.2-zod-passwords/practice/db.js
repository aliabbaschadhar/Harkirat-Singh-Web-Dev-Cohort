const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
    email: { type: String, unique: true },
    name: String,
    password: String,
})

const Todo = new Schema({
    title: String,
    userId: ObjectId,
    done: Boolean,
})

const userModel = mongoose.model("users", User);
const todoModel = mongoose.model("todos", Todo);

module.exports = {
    userModel, todoModel
}