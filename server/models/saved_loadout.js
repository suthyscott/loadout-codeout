const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    SavedLoadout: sequelize.define('saved_loadout', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
    })
}