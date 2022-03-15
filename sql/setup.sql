-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS members;

CREATE TABLE members (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name TEXT NOT NULL,
number INT NOT NULL CHECK

);

INSERT INTO
members (name, number)
VALUES
('Chrollo', 0),
('Feiten', 2);