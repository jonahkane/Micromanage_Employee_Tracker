INSERT INTO
    department (id, name)
VALUES (2, 'Full Stack Engineering');

INSERT INTO
    role (title, salary, department_id)
VALUES ('Junior Developer', 100000, 3);

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ('Jonah', 'Kane', 4, 5);