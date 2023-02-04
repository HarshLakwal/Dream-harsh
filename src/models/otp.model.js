const mongoose = require('mongoose')
const OtpSchema = new mongoose.Schema({
    mobile: {
        type: String,
    },
    otp: {
        type: String,
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: '10m' },
        }
    },
    type: {
        type: String
    }
})

const OtpModel = mongoose.model('Otps', OtpSchema)
module.exports = { OtpModel }
