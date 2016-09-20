import uuid from 'node-uuid';
import bcrypt from 'bcrypt';
const saltRounds = 10;
let pgp = require('pg-promise')({});

let db = pgp(process.env.DATABASE_URL);


const User = {
  createUser: createUser,
  checkPassword: checkPassword,
  getUserByLogin: getUserByLogin,
  getUserById: getUserById
}

function createUser(login, password) {
  return getUserByLogin(login).then((data) => {
    if(data === null) {
      return bcrypt.hash(password, saltRounds, (err, hash) => {
        let _id = uuid.v4();
        return db.one("INSERT INTO users (login, _id, password) VALUES ($1, $2, $3) returning login", [login, _id, hash])
          .then( (data) => {
            return data;
          })
          .catch( (error) => {
            console.log("ERROR:", error.message || error);
          });
      });
    } else {
      return data
    }
  })
}

function checkPassword(login, password) {
  return db.oneOrNone("SELECT password FROM users WHERE login=$1", login).then((data) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, data.password, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  })
}

function getUserByLogin(login) {
  return db.oneOrNone("SELECT * FROM users WHERE login=$1", login)
}

function getUserById(id) {
  return db.oneOrNone("SELECT * FROM users WHERE id=$1", id)
}



export default User;
