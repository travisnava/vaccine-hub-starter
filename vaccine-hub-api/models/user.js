const bcrypt = require("bcrypt")
const db = require("../db")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class User {
    static async login(credentials) {

        //user submit their email and pass
        //if any fields missing, throw an error
        //
        //look up the user in db by email
        //if user is found, compare submitted passwords with pass in db
        //if match, then return the user
        //
        //if anything goes wrong, throw an error
        throw new UnauthorizedError("Invalid email/password combination")

    }


    static async register(credentials){
        //user should submit their email, pw, other info
        //if any fields are missing, throw an error
        const requiredFields = ["password", "first_name", "last_name", "email", "location"]
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
             throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email.")
        }

        //make sure no user already exists in the system with that email
        //if it does, throw an error
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
        //take the users password and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        //take the users email and lowercase it
        const lowercasedEmail = credentials.email.toLowerCase()
        //
        //create a new user in the db with all their info



        const result = await db.query(`
            INSERT INTO users(
                password,
                first_name,
                last_name,
                email,
                location
                
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, password, first_name, last_name, email, location, date;
        
        `, [hashedPassword, credentials.first_name, credentials.last_name, lowercasedEmail, credentials.location])

        const user = result.rows[0]
        return user
    }


    static async fetchUserByEmail(email){
        if (!email){
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])
        const user = result.rows[0]
        return user
    }


}




module.exports = User