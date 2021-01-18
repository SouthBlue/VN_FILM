import Sequelize from 'sequelize'
import {sequelize, Op} from '../database/database.js'

const ActorFilm = sequelize.define('actor-film',{
    actor_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    film_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    }
},{
    timestamps: false,
    freezeTableName: true
})
export default ActorFilm;
