require("dotenv").config()
const { SECRET } = process.env
const { User } = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createToken = (username, id) => {
    return jwt.sign(
        {
            username,
            id
        },
        SECRET,
        {
            expiresIn: "2 days"
        }
    )
}

module.exports = {
    register: async (req, res) => {
        try {
            const { username, password, email, activisionId } = req.body
            let foundUser = await User.findOne({ where: { username } })
            if (foundUser) {
                res.status(400).send(
                    "That username is taken, please register with a different username"
                )
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({
                    username,
                    hashedPass: hash,
                    email,
                    activisionId
                })
                const token = createToken(
                    newUser.dataValues.username,
                    newUser.dataValues.id
                )
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    email: newUser.dataValues.email,
                    activisionId: newUser.dataValues.activisionId,
                    token,
                    exp
                })
            }
        } catch (error) {
            res.sendStatus(400)
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body
            let foundUser = await User.findOne({ where: { username } })
            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(
                    password,
                    foundUser.hashedPass
                )

                if (isAuthenticated) {
                    const token = createToken(
                        foundUser.dataValues.username,
                        foundUser.dataValues.id
                    )
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    res.status(200).send({
                        username: foundUser.dataValues.username,
                        userId: foundUser.dataValues.id,
                        email: foundUser.dataValues.email,
                        activisionId: foundUser.dataValues.activisionId,
                        token,
                        exp
                    })
                } else {
                    res.status(400).send("That password is incorrect")
                }
            } else {
                res.status(400).send("There is no user with that username")
            }
        } catch (error) {
            res.sendStatus(400)
        }
    }
}
