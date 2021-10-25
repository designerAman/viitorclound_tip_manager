const TABLE_NAME = `tips`;

module.exports = function makeTipDb({ mysql }) {
  return Object.freeze({
    addTip,
  });

  async function addTip({ tipDetails }) {
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const values = [tipDetails];

    const [rows] = await mysql.query(query, values);
    return rows;
  }
}