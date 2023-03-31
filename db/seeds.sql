INSERT INTO
    department (
        department_id,
        department_name
    )
VALUES (1, "Dispatch"), (2, "Customer Service"), (3, "Sales"), (4, "Quality Control");

INSERT INTO
    role (
        role_id,
        job_title,
        salary,
        department_id
    )
VALUES (1, "Dispatcher", 50000, 1), (2, "CSR", 40000, 2), (3, "Sales Person", 60000, 3), (4, "QC Tech", 50000, 4);

INSERT INTO
    employee (
        employee_id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES (1, "Chris", "Green", 1, NULL), (2, "Alex", "Smith", 2, 1)