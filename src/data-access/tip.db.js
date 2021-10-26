const TABLE_NAME = `tips`;

module.exports = function makeTipDb({ mysql }) {
  return Object.freeze({
    addTip,
    searchTipDetails,
  });

  async function addTip({ tipDetails }) {
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const values = [tipDetails];

    const [rows] = await mysql.query(query, values);
    return rows;
  }

  function generateSearchUserDetailQuery({ analyticsType, startDate, endDate, userId }) {
    let query;
    const values = [];

    if (analyticsType && analyticsType === 'mostVisited') {
      query = `SELECT place, count(*) AS noOfTimes FROM tips WHERE userId = ?`
      values.push(userId);
      
      if(startDate) {
        query += ` AND createdAt >= ?`;
        values.push(startDate);
      }

      if(endDate) {
        query += ` AND createdAt <= ?`;
        values.push(endDate);
      }
      query += `GROUP BY place ORDER BY noOfTimes DESC LIMIT 1`
    } else if (analyticsType && analyticsType === 'tipPercentage') {
      query = `SELECT totalAmount, count(*) AS noOfTimes FROM tips WHERE userId = ?`
      values.push(userId);

      if(startDate) {
        query += ` AND createdAt >= ?`;
        values.push(startDate);
      }

      if(endDate) {
        query += ` AND createdAt <= ?`;
        values.push(endDate);
      }
      query+= ` GROUP BY totalAmount ORDER BY noOfTimes DESC LIMIT 1`
    } else {
      query = `SELECT place AS "spentAt&quot", totalAmount, TRUNCATE((totalAmount/100)*tipPercentage, 2) AS  "tipAmount"  FROM tips WHERE userId = ?`;
      values.push(userId);

      if(startDate) {
        query += ` AND createdAt >= ?`;
        values.push(startDate);
      }

      if(endDate) {
        query += ` AND createdAt <= ?`;
        values.push(endDate);
      }
    }

    return { query, values };
  }

  async function searchTipDetails({ analyticsType, startDate, endDate, userId }) {
    const { query, values } = generateSearchUserDetailQuery({ analyticsType, startDate, endDate, userId });

    const [rows] = await mysql.query(query, values);

    return rows;
  }
}