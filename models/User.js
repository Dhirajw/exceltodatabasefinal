
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
//const Course = require('./Course');

const User = sequelize.define('user',{
  username: {
    type: DataTypes.STRING,
    allowNull : false
  },
  email:{
    type: DataTypes.STRING,
    allowNull : false,
    unique : true
  },
  password:{
    type:DataTypes.STRING,
    allowNull : false,
  },
  name:{
    type:DataTypes.STRING,
    allowNull: false
  },
  bio:{
    type:DataTypes.STRING
  },
  role:{
    type:DataTypes.ENUM('student','instructor'),
    defaultValue : 'student'
  }
});

User.sync().then((data)=>{
  console.log("Table and node synced succesfully");
}).catch((err)=>{
  console.log("Error found");
});

//User.belongsToMany(Course, { through: 'CourseUser', as: 'enrolledCourses' });

module.exports = User;