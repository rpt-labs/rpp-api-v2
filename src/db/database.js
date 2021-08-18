const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './src/db/roster.sqlite3';

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
        console.info('cohorts table created');
      }
    }
  );
};

const createStudentsTable = (db) => {
  db.run(
    `CREATE TABLE students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status VARCHAR,
      first_name VARCHAR NOT NULL,
      last_name VARCHAR NOT NULL,
      preferred_name VARCHAR,
      pronounced_name VARCHAR,
      zoom_name VARCHAR,
      email VARCHAR,
      github VARCHAR,
      state_of_residence VARCHAR,
      country_of_residence VARCHAR,
      ever_attended BOOLEAN,
      departure_reason VARCHAR,
      date_of_separation DATE,
      seir BOOLEAN,
      pronouns VARCHAR,
      has_accommodations BOOLEAN,
      salesforce_contact_record VARCHAR
    )`,
    (err) => {
      if (err) {
        // Table already created
      } else {
        console.info('students table created');
      }
    }
  );
};

const createCohortsStudentsTable = (db) => {
  db.run(
    `CREATE TABLE cohorts_students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      cohort_id INTEGER,
      is_active BOOLEAN,
      is_deferred BOOLEAN
    )`,
    (err) => {
      if (err) {
        // Table already created
      } else {
        console.info('cohorts_students table created');
      }
    }
  );
};

const createMilestoneMessagesTable = (db) => {
  db.run(
    `CREATE TABLE milestone_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message VARCHAR
      )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.info('sprints table created');
      }
    }
  );
};

const createSprintsTable = (db) => {
  db.run(
    `CREATE TABLE sprints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sprint_name INTEGER,
      )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.info('sprints table created');
      }
    }
  );
};

const createSprintMessagesTable = (db) => {
  db.run(
    `CREATE TABLE sprint_milestone_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sprint_id INTEGER,
      message_id INTEGER
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.info('cohorts_students table created');
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
    createStudentsTable(db);
    createCohortsStudentsTable(db);
    createMilestoneMessagesTable(db);
    createSprintsTable(db);
    createSprintMessagesTable(db);
  }
});

module.exports = db;
