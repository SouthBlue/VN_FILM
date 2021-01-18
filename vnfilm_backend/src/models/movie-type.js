import Sequelize from 'sequelize'
import {sequelize, Op} from '../database/database.js'

const Type = sequelize.define('movie_type',{
    type_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    type_name:{
        type: Sequelize.STRING
    },
    handle:{
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})
export default Type;
