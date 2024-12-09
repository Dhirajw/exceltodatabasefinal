const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
//const User = require("./User");
const Course = sequelize.define('course',{
    title:{
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    description :{
        type : DataTypes.STRING
    },
    syllabus :{
        type : DataTypes.STRING
    },
    startdate :{
        type : DataTypes.DATE,
        // allowNull : false
    },
    enddate :{
        type : DataTypes.DATE,
        // allowNull : false
    },
    isDeleted: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
     },
     isNotified:{
        type : DataTypes.BOOLEAN,
        defaultValue : true,
     }
},{
    paranoid: true, // Enables soft deletion
    timestamps: true, // Keeps createdAt and updatedAt fields
});

// Course.sync().then((data)=>{
//     console.log("course Table and node synced succesfully");
// }).catch((err)=>{
//     console.log("Error found");
// });
//Course.belongsToMany(User);
module.exports = Course;


