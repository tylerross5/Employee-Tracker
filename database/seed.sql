use employees;

INSERT INTO department
    (name)
VALUES
    ('Engineers'),
    ('Sales-Team'),
    ('Financials'),
    ('Law Team');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 60000, 1),
    ('Account Manager', 50000, 2),
    ('Sales Person', 100000, 2),
    ('Engineer', 90000, 3),
    ('Lead Engineer', 110000, 2);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Tyler', 'Ross', 1, NULL),
    ('Jack', 'Chapman', 2, NULL ),
    ('Jake', 'Roberts', 3, 1),
    ('Victoria', 'Bury', 4, NULL ),
    ('Steve', 'Aellis', 5, 2),
    ('Jane', 'Larsen', 6, 3),
    ('Lindsay', 'Kolcheff', 7,4),
    ('Matt', 'Natoli', 8, NULL );
