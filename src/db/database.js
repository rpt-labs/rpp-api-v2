const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './src/db/roster.sqlite3';
const cohorts = require('./cohorts');

const createCohortsTable = (db) => {
  db.run(
    `CREATE TABLE cohorts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cohort_id VARCHAR NOT NULL UNIQUE,
      learn_id INTEGER,
      product_code VARCHAR,
      rotation_id VARCHAR,
      schedule VARCHAR,
      start_date DATE NOT NULL,
      grad_date DATE NOT NULL,
      fifty_percent DATE,
      sixty_percent DATE,
      google_calendar_id VARCHAR,
      cohort_lead VARCHAR,
      tech_mentor VARCHAR,
      senior_phase_begins DATE,
      fec_start DATE,
      sdc_start DATE,
      outcome_start DATE,
      solo_1_start DATE,
      solo_1_end DATE,
      solo_2_start DATE,
      solo_2_end DATE,
      holiday_1_start DATE,
      holiday_1_end DATE,
      holiday_2_start DATE,
      holiday_2_end DATE
    )`,
    (err) => {
      if (err) {
        // Table already created
      } else {
        const insert = 'INSERT INTO cohorts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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