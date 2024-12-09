const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Assignment = sequelize.define('assignment',{
    title: {
        type: DataTypes.STRING,
        allowNull : false
    },
    discription:{
        type: DataTypes.STRING
    },
    deadline:{
        type: DataTypes.DATE,
        allowNull : false
    },
    courseId:{
        type: DataTypes.INTEGER,
        // references :{
        //     model : 'Course',
        //     key :'id'
        // },
        allowNull : false
    }
});

Assignment.associations = (models)=>{
    Assignment.belongsTo(models.Course,{as : 'course',foreignKey:'courseId'});
    Assignment.hasMany(models.AssignmentSubmission, { as: 'submissions', foreignKey: 'assignmentId' });
}
module.exports = Assignment;
