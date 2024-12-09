const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const sequelize = require('../config/db');
const DataTypes = require('sequelize');

const AssignmentSubmission = sequelize.define('assignmentsubmission',{
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    submittedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    studentId:{
        type:DataTypes.INTEGER,
        // references:{
        //     model: 'User',
        //     key: 'id',
        // },
        allowNull : false,
    },
    assignmentId:{
        type: DataTypes.INTEGER,
        // references:{
        //     model: 'Assignment',
        //     key:'id',
        // },
        allowNull : false,
    },
    grade: {
        type: DataTypes.INTEGER, // or a string like 'A', 'B', etc.
        allowNull: true,
      },
      feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
});

AssignmentSubmission.associations = (models)=>{
    AssignmentSubmission.belongsTo(models.Assignment,{as : 'assignment',foreignKey:'assignmentId'});
    AssignmentSubmission.belongsTo(models.User,{as :'student',foreignKey: 'studentId'});
}

return AssignmentSubmission;
module.exports = AssignmentSubmission;