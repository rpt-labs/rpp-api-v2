const express = require('express');

const db = require('../db/database.js');

const port = process.env.PORT || 9001;

const app = express();

app.get('/api/cohorts', (req, res) => {
  const sql = 'select * from cohorts';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
