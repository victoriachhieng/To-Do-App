CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task VARCHAR(250) NOT NULL,
    notes VARCHAR(250) NOT NULL,
    status VARCHAR(250) NOT NULL
);

-- INSERT
INSERT INTO tasks (task, notes, status) VALUES ('Laundry', 'Needs to be done by 5:00 PM', 'Incomplete');
INSERT INTO tasks (task, notes, status) VALUES ('Vacuum', 'Needs to be done by 2:00 PM', 'Incomplete');
INSERT INTO tasks (task, notes, status) VALUES ('Mop', 'Needs to be done in 2 weeks', 'Incomplete');
INSERT INTO tasks (task, notes, status) VALUES ('Put up Christmas Tree', 'Needs to be done by 3:00 PM', 'Incomplete');