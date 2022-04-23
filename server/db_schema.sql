-- DROP DATABASE IF EXISTS qa;

-- CREATE DATABASE qa;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL NOT NULL,
  product_id INTEGER,
  question_body VARCHAR(250),
  question_date BIGINT,
  asker_name VARCHAR(60),
  asker_email VARCHAR(60),
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL NOT NULL,
  question_id INTEGER,
  answer_body VARCHAR(1000),
  answer_date BIGINT,
  answer_name VARCHAR(60),
  answer_email VARCHAR(60),
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  PRIMARY KEY (id),
  CONSTRAINT fk_question
    FOREIGN KEY (question_id)
      REFERENCES questions(id)
      ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS answers_photos (
  id SERIAL NOT NULL,
  answer_id INTEGER,
  photo_url VARCHAR(1000),
  PRIMARY KEY (id),
  CONSTRAINT fk_answer
    FOREIGN KEY (answer_id)
      REFERENCES answers(id)
      ON DELETE CASCADE
)

-- ALTER TABLE questions
--   ALTER COLUMN id TYPE serial NOT NULL;

-- ALTER TABLE questions
--   ALTER COLUMN id INT NOT NULL AUTO_INCREMENT PRIMARY KEY;

select setval ('answers_photos_id_seq', (select max(id) from answers_photos));

select setval ('questions_id_seq', (select max(id) from questions));

select setval ('answers_id_seq', (select max(id) from answers));