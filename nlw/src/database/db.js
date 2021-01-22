const Database = require('sqlite-async')

function execute(db){
    
    //  ---- criar as tabelas do bando de dados ---------- //
    return db.exec(`
    create table if not exists proffys (
        id integer primary key autoincrement,
        name text,
        avatar text,
        whatsapp text,
        bio text
    );

    create table if not exists classes (
        id integer primary key autoincrement,
        subject integer,
        cost text,
        proffy_id integer
    );

    create table if not exists class_schedule (
        id integer primary key autoincrement,
        class_id integer,
        weekday integer,
        time_from integer,
        time_to integer
    );
    `)
}

// abre o db, ou cria ele se for a primeira vez.  __dirname = pasta atual
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)