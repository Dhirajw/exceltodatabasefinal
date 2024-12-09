const sequelize = require('../config/db');
const {DataTypes} =require('sequelize');
const User = require("./User");
const Course = require("./Course");

const Enrollment = sequelize.define('Enrollment',{

    role:{
        type:DataTypes.ENUM("instructor","student"),
        allowNull: false
    }
});


User.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(User, { through: Enrollment });

module.exports = Enrollment;

