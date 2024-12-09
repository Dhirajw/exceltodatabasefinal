
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, 
  {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

sequelize.authenticate().then(() => {
  console.log("Connection Successful");
}).catch((err) => {
  console.log("Connection Failed:", err);
});

module.exports = sequelize;


// const mysql = require('mysql');

// const db = mysql.createConnection({
//     host:'localhost',
//     user : 'Dhiraj',
//     password:'123',
//     database : 'coursemanagment'
// });

// db.connect(err =>{
//     if(err){
//         console.error('Databases connection failed',err);
//         return;
//     }
//     console.log('Connected to MYSQL databases');
// }); 

// module.exports = db;
