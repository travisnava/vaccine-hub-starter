const db = require("../db")
const { UnauthorizedError } = require("../utils/errors")

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
        //
        //make sure no user already exists in the system with that email
        //if it does, throw an error
        //take the users password and hash it
        //take the users email and lowercase it
        //
        //create a new user in the db with all their info
        //return the user

    }
}




module.exports = User