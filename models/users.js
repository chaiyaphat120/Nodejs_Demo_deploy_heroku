const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullname: String,
        email: {
            type: String,
            required: true,
        },
        tel: String,
        role: {
            type: String,
            required: true,
        },
    },
    { collection: "users", timestamps: true.valueOf }
)

const user = mongoose.model("Users", userSchema)
module.exports = user
