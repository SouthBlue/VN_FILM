import Sequelize from 'sequelize'
import {sequelize, Op} from '../database/database.js'

const Country = sequelize.define('country',{
    country_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    country_name:{
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})
export default Country;
