CREATE DATABASE todo_databse;

--\c into todo_databse
-- \l list all databases, \dt list all tables relations etc in the database
-- serial repeasts the numbers
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, 
    description VARCHAR(225)
);