import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    terms: {
        type: Boolean,
        required: true
    },
    subscribe: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true, versionKey: false
})

const User = mongoose.model('User', userSchema)

export default User