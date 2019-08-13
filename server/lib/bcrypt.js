import { SALT_WORK_FACTOR } from '../config'
import bcrypt from 'bcrypt'

// 加密
export function encrypt (password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) reject(password)
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(password)
        resolve(hash)
      })
    })
  })
}

export function comparePassword (_password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(_password, hash, function (err, isMatch) {
      if (err) reject(err)
      else resolve(isMatch)
    })
  })
}