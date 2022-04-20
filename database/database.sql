-- DROP DATABASE IF EXISTS qa;

-- CREATE DATABASE qa;

CREATE TABLE IF NOT EXISTS questions (
  id INT GENERATED ALWAYS AS IDENTITY,
  product_id INTEGER,
  question_body VARCHAR(250),
  question_date BIGINT,
  asker_name VARCHAR(60),
  asker_email VARCHAR(60),
  reported BOOLEAN,
  helpful INTEGER,
  PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS answers (
  id INT GENERATED ALWAYS AS IDENTITY,
  question_id INTEGER,
  answer_body VARCHAR(1000),
  answer_date BIGINT,
  answer_name VARCHAR(60),
  answer_email VARCHAR(60),
  reported BOOLEAN,
  helpful INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT fk_question
    FOREIGN KEY (question_id)
      REFERENCES questions(id)
      ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS answers_photos (
  id INT GENERATED ALWAYS AS IDENTITY,
  answer_id INTEGER,
  photo_url VARCHAR(1000),
  PRIMARY KEY (id),
  CONSTRAINT fk_answer
  FOREIGN KEY (answer_id)
    REFERENCES answers(id)
    ON DELETE CASCADE
)

-- ALTER TABLE answers_photos
--   ALTER COLUMN photo_url TYPE VARCHAR(1000);
