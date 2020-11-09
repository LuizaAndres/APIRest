const mysql = require("mysql");
const dbConfig = require("../configs/db.config.js");

//Cria uma conexão com o banco de dados
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//Abre uma nova conexão com o mysql
connection.connect(error => {
    if (error)
        throw error;
    console.log("Conectado com o banco de dados");
});

module.exports = connection;