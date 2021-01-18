import Sequelize from 'sequelize'
import {sequelize, Op} from '../database/database.js'
import Category from './category.js'
import Film from './film.js'
const CategoryFilm = sequelize.define('category_film',{
    film_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    category_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    }
},{
    timestamps: false,
    freezeTableName: true
})
Category.hasMany(CategoryFilm, {foreignKey: 'category_id'});
CategoryFilm.belongsTo(Category, {foreignKey: 'category_id', as: 'category'});

Film.hasMany(CategoryFilm, {foreignKey: 'film_id'});
CategoryFilm.belongsTo(Film, {foreignKey: 'film_id'})
export default CategoryFilm;
