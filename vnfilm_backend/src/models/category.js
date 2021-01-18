import Sequelize from 'sequelize'
import {sequelize, Op} from '../database/database.js'

const Category = sequelize.define('category',{
    category_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    category_name:{
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})
export default Category;
