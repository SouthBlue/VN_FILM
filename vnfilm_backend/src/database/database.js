import Sequelize from 'sequelize';
const sequelize = new Sequelize(
    'vnfilm',
    'postgres',
    '123456',
    {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    operatorsAlias: false,
    pool: {
            max: 5,
            min: 0,
            require:30000,
            idle: 10000
        }
    }
);
const Op = Sequelize.Op
sequelize.authenticate()
.then(() => console.log('connected!'))
.catch(err => console.log(err.message))

export {sequelize, Op};

