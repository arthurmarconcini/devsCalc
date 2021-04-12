const Database = require("./config") 

const initDb = {
    async init() {  

    //inciando a conexão com o banco de dados sqlite.
    const db = await Database()

    await db.exec(`
    CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        avatar TEXT, 
        monthly_budget INT, 
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`);

    await db.exec(`
    CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )`);

    await db.run(`
    INSERT INTO profile (    
        name, 
        avatar, 
        monthly_budget, 
        days_per_week, 
        hours_per_day, 
        vacation_per_year,
        value_hour  
    ) VALUES (
        "arthur",
        "https://github.com/arthurmarconcini.png",
        3000,
        5,
        5,
        4,
        70
    );`)

    await db.run(`
    INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "parcerias",
        2,
        1,
        1617514376018
    );`)

    await db.run(`
    INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "pizzaria loucao",
        4,
        20,
        1617514376018
    );`)

    //fechando a conexao com o banco de dados sqlite.
    await db.close()

    }
}

initDb.init();


