import Sequelize from 'sequelize'
import {sequelize, Op} from '../database/database.js'

const User = sequelize.define('user',{
    user_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fullname:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    hashpass:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    birthday:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    sex:{
        type: Sequelize.STRING,
        allowNull: false,
        isIn: [['m', 'f']]
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true
})

export default User;