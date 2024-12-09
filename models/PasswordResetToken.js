const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const PasswordResetToken = sequelize.define("sswordResetToken",{
    token:{
        type : DataTypes.STRING ,
        allowNull : false
    },
    email:{
        type : DataTypes.STRING ,
        allowNull : false
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = PasswordResetToken;
