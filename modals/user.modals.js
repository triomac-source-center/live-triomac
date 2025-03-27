import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String, 
        required: true,
        unique: true,
    },
	email: { 
        type: String, 
        required: true 
    },
    username: {
        type: String, 
        required: true
    },
	photo: {
        type: String, 
        required: true
    },
    firstname: {
        type: string,
    },
    lastName: {
        type: string,
    },
})

const User = mongoose.model("User", UserSchema)

export default User