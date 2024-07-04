import bcrypt from 'bcrypt'

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
const isValidPass = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export { createHash, isValidPass };