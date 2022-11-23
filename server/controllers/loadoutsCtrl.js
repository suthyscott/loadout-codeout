const { Loadout } = require("../models/loadout")
const { User } = require("../models/user")
const { SavedLoadout } = require("../models/saved_loadout")

module.exports = {
    addLoadout: async (req, res) => {
        try {
            const {
                primaryWeapon,
                secondaryWeapon,
                tacticalEquipment,
                lethalEquipment,
                perkOne,
                perkTwo,
                perkThree,
                perkFour,
                fieldUpgradeOne,
                fieldUpgradeTwo,
                picture
            } = req.body
            const { userId } = req.params

            await Loadout.create({
                primaryWeapon,
                secondaryWeapon,
                tacticalEquipment,
                lethalEquipment,
                perkOne,
                perkTwo,
                perkThree,
                perkFour,
                fieldUpgradeOne,
                fieldUpgradeTwo,
                picture,
                userId
            })

            res.sendStatus(200)
            // res.status(200).send(loadout)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    editLoadout: async (req, res) => {
        try {
            const {
                primaryWeapon,
                secondaryWeapon,
                tacticalEquipment,
                lethalEquipment,
                perkOne,
                perkTwo,
                perkThree,
                perkFour,
                fieldUpgradeOne,
                fieldUpgradeTwo,
                picture,
                loadoutId
            } = req.body
            await Loadout.update(
                {
                    primaryWeapon,
                    secondaryWeapon,
                    tacticalEquipment,
                    lethalEquipment,
                    perkOne,
                    perkTwo,
                    perkThree,
                    perkFour,
                    fieldUpgradeOne,
                    fieldUpgradeTwo,
                    picture
                },
                {
                    where: { id: +loadoutId }
                }
            )
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    getAllLoadouts: async (req, res) => {
        try {
            const loadouts = await Loadout.findAll({
                include: [
                    {
                        model: User,
                        required: true,
                        attributes: ["username"]
                    }
                ]
            })
            res.status(200).send(loadouts)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    addToMyLoadouts: async (req, res) => {
        try {
            const { userId, loadoutId } = req.body
            await SavedLoadout.create({ userId, loadoutId })
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    getMyLoadouts: async (req, res) => {
        try {
            const {userId} = req.params
            const savedLoadouts = await SavedLoadout.findAll({
                where: {userId},
                include: [{
                    model: Loadout,
                    require: true,
                    include: {
                        model: User,
                        required: true,
                        attributes: ["username"]
                    }
                }]
            })
            res.status(200).send(savedLoadouts)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}
