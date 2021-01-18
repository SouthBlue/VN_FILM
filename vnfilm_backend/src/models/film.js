import Sequelize from 'sequelize'
import {sequelize, Op} from '../database/database.js'
import Country from '../models/country.js'
import Type from '../models/movie-type.js'

const Film = sequelize.define('film',{
    film_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    film_name:{
        type: Sequelize.STRING
    },
    film_name_real:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.STRING
    },
    director:{
        type: Sequelize.STRING
    },
    type_id:{
        type: Sequelize.INTEGER
    },
    country_id:{
        type: Sequelize.INTEGER
    },
    year:{
        type: Sequelize.INTEGER
    },
    image:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    },
    num_view:{
        type: Sequelize.INTEGER
    },
    tag:{
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})
Country.hasMany(Film, { foreignKey:'country_id', sourceKey:'country_id'});
Film.belongsTo(Country, { foreignKey:'country_id', targetKey:'country_id'});
Type.hasMany(Film, { foreignKey:'type_id', sourceKey:'type_id'});
Film.belongsTo(Type, { foreignKey:'type_id', targetKey:'type_id'});
export default Film;