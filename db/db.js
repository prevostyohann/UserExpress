const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Error connecting to database: ", err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            rights TEXT DEFAULT user
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS ads(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            userId INTEGER NOT NULL,
            isApproved INTEGER DEFAULT 0,
            FOREIGN KEY(userId) REFERENCES users(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS favorites(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            adId INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(adId) REFERENCES ads(id)
        )`);

        console.log('Connected and tables created');
    }
});
module.exports = db;