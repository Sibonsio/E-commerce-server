import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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