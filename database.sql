CREATE TABLE "tasks" (
    "ID" SERIAL PRIMARY KEY,
    "Task" VARCHAR(250) NOT NULL,
    "Notes" VARCHAR(250) NOT NULL,
    "Date" DATE
);

-- INSERT
INSERT INTO "tasks" ("Task", "Notes", "Date")
VALUES ('Laundry', 'Needs to be done by 5:00 PM', '11-24-2018');
