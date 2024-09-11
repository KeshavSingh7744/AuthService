const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in user service");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      // step-1 => fetch the user using the email
      const user = await this.userRepository.getByEmail(email);
      // step-2 => compare incoming plain password with stored encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("password doesnt match");
        throw { error: "Incorrect Password" };
      }
      // step-3 => if passwords match then create a token and send it to the user
      const newJwt = this.createToken({ email: user.email, id: user.id });
      return newJwt;
    } catch (error) {
      console.log("something went wrong while signing in");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token" };
      }
      return user.id;
    } catch (error) {
      console.log("something went wrong in authentication");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something went wrong in token verification", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
