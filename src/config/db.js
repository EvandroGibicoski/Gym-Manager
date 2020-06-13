const { Pool } =  require ('pg');

module.exports =  new Pool({
    user: "postgres",
    password: "130960",
    host: "localhost",
    port:"5432",
    database:"gymmanager"
});