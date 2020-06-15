insert into cars(make, model, miles, year, color)
values(${make}, ${model}, ${miles}, ${year}, ${color}) returning *;
-- values ($1, $2, $3, $4, $5)
-- note use returning * to see what was just made 