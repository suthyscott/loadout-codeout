const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    AttachmentBuild: sequelize.define('attachment_build', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        primary: DataTypes.BOOLEAN,
        scope: DataTypes.STRING,
        barrel: DataTypes.STRING,
        muzzle: DataTypes.STRING,
        underbarrel: DataTypes.STRING,
        magazine: DataTypes.STRING,
        ammunition: DataTypes.STRING,
        grip: DataTypes.STRING,
        grip: DataTypes.STRING,
        stock: DataTypes.STRING
    })
}