INSERT INTO users (email, role_id, hash)
VALUES ($1, $2, $3)
returning id, email, role_id