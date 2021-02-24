const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './src/db/roster.sqlite3';
const cohorts = require('./cohorts');

const createCohortsTable = (db) => {
  db.run(
    `CREATE TABLE cohorts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cohort_id VARCHAR NOT NULL UNIQUE,
      cohort_name VARCHAR NOT NULL UNIQUE,
      cohort_short_name VARCHAR NOT NULL UNIQUE,
      phase text,
      status text
    )`,
    (err) => {
      if (err) {
        // Table already created
      } else {
        const insert = 'INSERT INTO cohorts VALUES (?, ?, ?, ?, ?, ?)';
        cohorts.forEach((cohort) => {
          db.run(insert, cohort);
        });
      }
    }
  );
};

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    createCohortsTable(db);
  }
});

module.exports = db;