const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//Defining Schema of user database
const User = new Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
})
//Schema for todos 
const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId,
})

// DataModel ==> A data model is a conceptual representation of how data is organized and structured within a database system.

const UserModel = mongoose.model("users", User);
// this creates a model according to the given User Schema and now all the operations will be done on that model while keeping in mind that all the incoming data must follow the schema.
// This line says that create a model according to User Schema and store the data inside the "users" collection.

const TodoModel = mongoose.model("todos", Todo);

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel,
}