const mysql=require('mysql');
const dbConfig=require('../config/db.config');

//create connection to the database
const connection=mysql.createConnection({
    host:dbConfig.HOST,
    user:dbConfig.USER,
    database:dbConfig.DATABASE,
    password:dbConfig.PASSWORD
});

//open the mysql connection
connection.connect(error=>{
    if (error) throw error;
    console.log('successfully connected to the database');
});

module.exports=connection;