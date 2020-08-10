const bcrypt = require('bcrypt')

const hashingPswd = password => {
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND))
        const hashedPwd = bcrypt.hashSync(password, salt)
        return hashedPwd
    } catch (err) {
        console.log("hashing error", err)
    }
}

const checkingPwd = (password, hashedPwd) => {
    try {
        return bcrypt.compareSync(password, hashedPwd)
    } catch (err) {
        console.log("comare password error", err)
    }
}

module.exports = {
    hashingPswd,
    checkingPwd
}