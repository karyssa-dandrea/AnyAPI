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

  static async findById(id) {
    const { rows } = await pool.query(' SELECT * FROM members WHERE id=$1 ', [
      id,
    ]);
    return new Member(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingMember = await Member.findById(id);
    const updatedAttributes = { ...existingMember, ...attributes };
    const { name, number } = updatedAttributes;
    const { rows } = await pool.query(
      `UPDATE
      members
      SET
      name=$1,
      number=$2
      WHERE
      id=$3
      RETURNING
      *
      `,
      [name, number, id]
    );
    return new Member(rows[0]);
  }
};
