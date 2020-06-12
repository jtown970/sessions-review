DROP TABLE IF EXISTS user_history;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
  id serial primary key,
  name varchar(10)
);

CREATE TABLE users (
  id serial primary key,
  email varchar(150) not null unique,
  role_id int not null references roles(id),
  hash text not null
);

CREATE TABLE user_history(
  id serial primary key,
  users_id int references users(id),
  request text,
  time timestamp default now()
);

INSERT INTO roles (name)
VALUES('user'), ('admin');