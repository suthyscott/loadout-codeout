require('dotenv').config()
const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {sequelize} = require('./util/database')
const {User} = require("./models/user")
const {Loadout} = require("./models/loadout")
const {AttachmentBuild} = require("./models/attachment_build")
const {SavedLoadout} = require("./models/saved_loadout")


const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Loadout)
Loadout.belongsTo(User)

Loadout.hasMany(AttachmentBuild)
AttachmentBuild.belongsTo(Loadout)

User.hasMany(SavedLoadout)
Loadout.hasMany(SavedLoadout)
SavedLoadout.belongsTo(User)
SavedLoadout.belongsTo(Loadout)

const {register, login} = require('./controllers/authCtrl')
const {isAuthenticated} = require('./middleware/isAuthorized')


app.post('/register', register)
app.post('/login', login)

// This will reset and reseed your db: {force: true}
sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, console.log(`Take us to warp ${SERVER_PORT}!`))
})
.catch(err => console.log(err))