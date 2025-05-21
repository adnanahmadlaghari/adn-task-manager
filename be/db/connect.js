const mongoose = require("mongoose")

const ConnectDB = async(url) => {
    try {
        console.log("connecting...")
       await mongoose.connect(url)
       
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectDB