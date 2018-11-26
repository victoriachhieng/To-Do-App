CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task VARCHAR(250) NOT NULL,
    notes VARCHAR(250) NOT NULL,
    status VARCHAR(250) NOT NULL
);

-- INSERT
INSERT INTO "tasks" ("Task", "Notes", "Date")
VALUES ('Laundry', 'Needs to be done by 5:00 PM', '11-24-2018');
