import mongoose from 'mongoose'
import crypto from 'crypto'
const UserSchema = new mongoose.Schema({
    seller: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('User', UserSchema)