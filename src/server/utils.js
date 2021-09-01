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

const getValidMessages = (data) => {
  const sprintsMap = {};
  // @TODO: refactor UI to support a simpler data structure
  data.map((item) =>
    sprintsMap[item.sprint_name]
      ? sprintsMap[item.sprint_name].messages.push({ message: item.message })
      : (sprintsMap[item.sprint_name] = {
          id: item.id,
          messages: [{ message: item.message }]
        })
  );
  return sprintsMap;
};

module.exports = { getData, getValidMessages };