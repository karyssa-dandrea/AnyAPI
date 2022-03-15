const pool = require('../utils/pool');

module.exports = class Members {
  id;
  name;
  number;

  constructor(row) {
    this.id = row.id;
    this.number = row.number;
  }

  static async insert({ name, number }) {
    const { rows } = await pool.query(
      ` INSERT INTO 
        members (name, number)
        VALUES
        ($1, $2, $3)
        RETURNING
        *
        `,
      [name, number]
    );
    return new Members(rows[0]);
  }
};
