const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    Loadout: sequelize.define('loadout', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        primaryWeapon: DataTypes.STRING,
        secondaryWeapon: DataTypes.STRING,
        tacticalEquipment: DataTypes.STRING,
        lethalEquipment: DataTypes.STRING,
        perkOne: DataTypes.STRING,
        perkTwo: DataTypes.STRING,
        perkThree: DataTypes.STRING,
        perkFour: DataTypes.STRING,
        fieldUpgradeOne: DataTypes.STRING,
        fieldUpgradeTwo: DataTypes.STRING,
        picture: DataTypes.STRING
    })
}