USE employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Business'),
    ('IT');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Sales assistant', 60000, 1),
    ('Main Engineer', 120000, 2),
    ('Junior software engineer', 16000, 2),
    ('Business developer', 125000, 3),
    ('Software developer', 250000, 4),
    ('Web developer', 190000, 4);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Dan', 'Oram', 1, NULL),
    ('Elizabeth', 'Long', 2, 1),
    ('Niall', 'White', 3, NULL),
    ('Chris', 'James', 4, 3),
    ('Matt', 'Brown', 5, NULL),
    ('Bria', 'Smith', 6, 5),
    ('Charlie', 'Smith', 7, NULL),
    ('Lallit', 'Jones', 8, 7);