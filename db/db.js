const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./ms.db";

function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createUserTable(db);
      createChristianTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}

function createUserTable(db) {
  db.exec(`
  CREATE TABLE users
  (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name   VARCHAR(50) NOT NULL,
    surname   VARCHAR(50) NOT NULL,
    mobile VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    capacity VARCHAR(2) NOT NULL
  );
`);
}

function createChristianTable(db) {
  db.exec(`
  CREATE TABLE christians
  (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    date   VARCHAR NOT NULL,
    chairman   VARCHAR NOT NULL,
    time VARCHAR NOT NULL,
    opening_song INTEGER NOT NULL,
    treassures VARCHAR NOT NULL
  );
`);
}

module.exports = createDbConnection();
