const bcrypt = require("bcryptjs");

const registerUser = async (password) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err) {
        return err;
    }
}

const authenticateUser = async (password, hashValue) => {
    try {
        return bcrypt.compare(password, hashValue);
    }
    catch (err) {
        return err;
    }
}

module.exports = { registerUser,authenticateUser };