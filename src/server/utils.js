const getData = (db, query ,res, fn) => {
  const params = [];
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: fn ? fn(rows) : rows
    });
  });
}
module.exports = getData;