DELETE FROM usage u1
USING usage u2
WHERE u1.id > u2.id
AND u1.date_and_time = u2.date_and_time;