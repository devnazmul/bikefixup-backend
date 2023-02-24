const bcrypt =require('bcrypt')

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await  bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            return err;
        }
        return hash
    });
    return hashedPassword
}

module.exports = {
    hashPassword
} 