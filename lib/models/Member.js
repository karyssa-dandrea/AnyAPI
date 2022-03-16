const pool = require('../utils/pool');

module.exports = class Member {
  id;
  name;
  number;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.number = row.number;
  }

  static async insert({ name, number }) {
    const { rows } = await pool.query(
      ` INSERT INTO 
        members (name, number)
        VALUES
        ($1, $2)
        RETURNING
        *
        `,
      [name, number]
    );

    return new Member(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM members
      `
    );
    return rows.map((row) => new Member(row));
  }
};
