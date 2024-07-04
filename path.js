import { fileURLToPath } from 'url'
import { dirname } from 'path'
import jwt from 'jsonwebtoken'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const SECRET_KEY = 'CoderCoder123'
export const generaToken = (usuario) => jwt.sign(usuario, SECRET_KEY, {expiresIn: '1h'})
export const validaToken = (token) => jwt.verify(token, SECRET_KEY)