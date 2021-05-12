const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"qwerty",
    database:"todo_databse",
    host:"localhost",
    port:5432,
});

module.exports = pool;