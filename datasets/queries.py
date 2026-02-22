''' 
1) Types of misconduct of each officer who had a youth interaction with a history of misconduct: 

SELECT f.contact_officer_name, m.allegation, m.title_rank, COUNT(*) as misconduct_count
FROM bpi_fio_record f
JOIN bpi_misconduct m ON f.employee_id = m.employee_id
WHERE f.key_situations LIKE '%Juvenile%'
GROUP BY f.contact_officer_name, m.allegation
ORDER BY f.contact_officer_name, misconduct_count DESC;


2) Every officer who has a history of misconduct who had a youth interaction:

SELECT DISTINCT f.contact_officer_name, f.employee_id
FROM bpi_fio_record f, bpi_misconduct m
WHERE key_situations LIKE '%Juvenile%'
    AND f.employee_id = m.employee_id;


3) Total number of juvenile police interactions (NOT DISTINCT)

SELECT contact_officer_name
FROM bpi_fio_record
WHERE key_situations LIKE '%Juvenile%'

'''