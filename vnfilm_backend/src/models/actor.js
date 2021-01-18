import Sequelize from 'sequelize'
import {sequelize, Op} from '../database/database.js'

const Actor = sequelize.define('actor',{
    actor_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    actor_name:{
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})
export default Actor;
