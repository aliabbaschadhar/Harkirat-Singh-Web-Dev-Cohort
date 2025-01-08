const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;




const userSchema = new Schema({
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String,
})

const adminSchema = new Schema({
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String,
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    ImageUrl: String,
    creatorId: ObjectId
})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId,
})

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
}